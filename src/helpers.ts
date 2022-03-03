import { Energy, Label, Prisma, PrismaClient } from "@prisma/client";
import { AxiosError, AxiosInstance } from "axios";
import cheerio, { Cheerio, CheerioAPI } from "cheerio";
import ProgressBar from "progress";
import {
	ALL_ELEMENTS_SELECTOR,
	BASE_URL,
	BREAD_UNITS_UNIT,
	CALORIES_SELECTOR,
	CARBOHYDRATE_SELECTOR,
	CONFIRMED_LABELS,
	EAN_SELECTOR,
	FAT_SELECTOR,
	FIBER_SELECTOR,
	GRAMS_UNIT,
	GROUP_SELECTOR,
	JOULES_SELECTOR,
	KILOCALORIES_UNIT,
	KILOJOULES_UNIT,
	LABELS_SELECTOR,
	MANUFACTURER_SELECTOR,
	MICROGRAMS_UNIT,
	MILLIGRAMS_UNIT,
	PERCENT_UNIT,
	PROTEIN_SELECTOR,
	SALT_SELECTOR,
	SEARCH_ROUTE,
	SERVING_SELECTOR,
	SERVING_TITLE_SELECTOR,
	SUGAR_SELECTOR,
	VALUES_SELECTOR,
} from "./constants";
import {
	MeasurementCreateObject,
	Measurement,
	ResolvablePromise,
	ResourcesData,
	Section,
	SectionType,
	SectionValueType,
	Unit,
} from "./interfaces";

export const constructUrl = (slugs: string[]) => BASE_URL + slugs.join(".");
export const extractHtml = async (axios: AxiosInstance, slugs: string[]) => {
	const url = constructUrl(slugs);

	try {
		const response = await axios.get(url).then((resp) => {
			if (resp.status === 404) {
				throw new Error(`Resource not found: ${url}`);
			}
			return resp;
		});
		const html = response.data;
		return cheerio.load(html);
	} catch (error) {
		//TODO: Better Logging
		console.error(error.message);
		return undefined;
	}
};

export const createDbTransactionsForSlugs = async (
	prisma: PrismaClient,
	page: CheerioAPI
) => {
	const allElements = page(ALL_ELEMENTS_SELECTOR);
	const resourcesData: ResourcesData[] = [];
	const promises: ResolvablePromise[] = [];

	allElements.each((i, elem) => {
		const $ = cheerio.load(elem);
		const displayName = $.text();
		const slug = $("a").attr("href");
		resourcesData.push({
			displayName,
			slug,
		});

		new Promise(() => {
			promises.push({
				resolve: () => {
					saveResourceData(prisma, { displayName, slug });
				},
			});
		});
	});

	return promises;
};

const saveResourceData = async (prisma: PrismaClient, data: ResourcesData) => {
	return prisma.resource
		.create({
			data: { displayName: data.displayName, slug: data.slug },
		})
		.catch((err) => console.log(err));
};

export const resolvePromisesSequentially = async (
	promises: ResolvablePromise[]
) => {
	const bar = new ProgressBar(`Saving in Database [ :bar ] :percent :etas`, {
		total: promises.length,
		clear: true,
	});
	for (let i = 0; i < promises.length; i++) {
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(promises[i].resolve());
				bar.tick();
			}, 3);
		});
	}
};

export const getIndexingTransactions = async (
	axios: AxiosInstance,
	prisma: PrismaClient,
	queries: string
) => {
	const bar = new ProgressBar(`Extracting Data [ :bar ] :percent :etas`, {
		total: queries.length,
		clear: true,
	});
	const transactions: ResolvablePromise[][] = [];
	for (let idx in queries as any) {
		const query: string = queries[idx];
		const searchResultPage = await extractHtml(axios, [
			SEARCH_ROUTE,
			query,
		]);

		const newPromises = await createDbTransactionsForSlugs(
			prisma,
			searchResultPage
		);

		transactions.push(newPromises);
		bar.tick();
	}
	return transactions.flat();
};

export const createAllLabels = async (prisma: PrismaClient) => {
	const createManyData: Prisma.LabelCreateManyInput[] = [];
	CONFIRMED_LABELS.forEach((label) => {
		createManyData.push({ name: label });
	});

	const response = await prisma.label.createMany({ data: createManyData });
	console.log("created %d new labels.", response.count);
};

export const extractAndMatchLabels = (html: CheerioAPI, labels: Label[]) => {
	if (html) {
		const extractedLabels = html(LABELS_SELECTOR);
		const matchedLabels: Label[] = [];
		extractedLabels.each((idx, item) => {
			const extractedLabel = cheerio(item).text();
			const foundIdx = labels.findIndex(
				(label) => label.name === extractedLabel
			);

			if (foundIdx > -1) matchedLabels.push(labels[foundIdx]);
		});

		return matchedLabels;
	}

	return undefined;
};

export const extractEan = (html: CheerioAPI) => {
	const selectedText = html(EAN_SELECTOR).text();
	const match = selectedText.match(/EAN: (\d+)/);

	return match ? match[1] : undefined;
};

export const extractManufacturer = (html: CheerioAPI) =>
	html(MANUFACTURER_SELECTOR).text().replace("Hersteller: ", "");

export const extractGroup = (html: CheerioAPI) =>
	html(GROUP_SELECTOR).text().replace("Produktgruppe: ", "");

export const extractDataSections = (html: CheerioAPI) => {
	const sections: Section[] = [];
	const rightColumnEl = html("div.standardcontent > div:eq(1)");
	const rowEls = cheerio.load(rightColumnEl.html());

	const rows = rowEls("div");

	let section: Section;

	rows.each((i, el) => {
		const row = cheerio.load(el);
		const isHeaderEl = el.attribs["class"] === "itemsec2012";
		const isContentEl =
			el.attribs["style"] &&
			el.attribs["style"].includes("padding:2px 4px;");

		if (isHeaderEl && !!section) {
			sections.push(section);
			section = undefined;
		}

		if (isHeaderEl && !section) {
			section = { name: row("h2").text(), values: {} };
		}

		if (isContentEl) {
			const rowName = row("div.sidrow").text();
			const rowValue = row("div:last").text();
			section.values[rowName] = rowValue;
		}

		const isLastElement = rows.last().get(0) === rows[i];

		if (isLastElement) sections.push(section);
	});

	return sections;
};

export const extractSectionData = (data: Section[], type: SectionType) =>
	data.find((section) => section.name.includes(type));

const parseUnitValue = (data: string, unitAbbreviation: string) =>
	parseFloat(data?.replace(unitAbbreviation, "").replace(",", "."));

export const extractEnergy = (data: Section) => {
	const caloriesData = data.values[SectionValueType.CALORIES];
	const calorificValueData = data.values[SectionValueType.CALORIFIC_VALUE];
	const caloriesDefaultUnit = KILOCALORIES_UNIT;
	const calorificValueDefaultUnit = KILOJOULES_UNIT;

	const calories: Measurement = {
		value: parseUnitValue(
			caloriesData,
			` ${caloriesDefaultUnit.abbreviation}`
		),
		unit: caloriesDefaultUnit,
	};
	const calorificValues: Measurement = {
		value: parseUnitValue(
			calorificValueData,
			` ${calorificValueDefaultUnit.abbreviation}`
		),
		unit: calorificValueDefaultUnit,
	};

	return { calories, calorificValues };
};

export const extractProtein = (data: Section) => {
	const proteinData = data.values[SectionValueType.PROTEIN];
	const defaultUnit = GRAMS_UNIT;

	const protein: Measurement = {
		value: parseUnitValue(proteinData, ` ${defaultUnit.abbreviation}`),
		unit: defaultUnit,
	};

	return protein;
};
export const extractCholesterol = (data: Section) => {
	const cholesterolData = data.values[SectionValueType.CHOLESTEROL];
	const defaultUnit = MILLIGRAMS_UNIT;

	const cholesterol: Measurement = {
		value: parseUnitValue(cholesterolData, ` ${defaultUnit.abbreviation}`),
		unit: defaultUnit,
	};

	return cholesterol;
};

export const extractBreadUnit = (data: Section) => {
	const breadUnitData = data.values[SectionValueType.BREAD_UNIT];
	const defaultUnit = BREAD_UNITS_UNIT;

	const breadUnit: Measurement = {
		value: parseUnitValue(breadUnitData, ` ${defaultUnit.abbreviation}`),
		unit: defaultUnit,
	};

	return breadUnit;
};

export const extractFat = (data: Section) => {
	const fatsData = data.values[SectionValueType.FAT];
	const defaultUnit = GRAMS_UNIT;

	const fat: Measurement = {
		value: parseUnitValue(fatsData, ` ${defaultUnit.abbreviation}`),
		unit: defaultUnit,
	};

	return fat;
};

export const extractCarbohydrates = (data: Section) => {
	const carbsData = data.values[SectionValueType.CARBOHYDRATES];
	const sugarCarbsData = data.values[SectionValueType.SUGAR];
	const defaultUnit = GRAMS_UNIT;

	const carbs: Measurement = {
		value: parseUnitValue(carbsData, ` ${defaultUnit.abbreviation}`),
		unit: defaultUnit,
	};
	const sugarCarbs: Measurement = {
		value: parseUnitValue(sugarCarbsData, ` ${defaultUnit.abbreviation}`),
		unit: defaultUnit,
	};

	return { carbs, sugarCarbs };
};

export const extractWater = (data: Section) => {
	const waterData = data.values[SectionValueType.WATER];

	const water: Measurement = {
		value: parseUnitValue(waterData, PERCENT_UNIT.abbreviation),
		unit: PERCENT_UNIT,
	};

	return water;
};

export const extractFiber = (data: Section) => {
	const fiberData = data.values[SectionValueType.FIBER];
	const defaultUnit = GRAMS_UNIT;

	const fiber: Measurement = {
		value: parseUnitValue(fiberData, ` ${defaultUnit.abbreviation}`),
		unit: defaultUnit,
	};

	return fiber;
};

export const extractVitamins = (data: Section) => {
	const vitAData = data?.values[SectionValueType.VITAMIN_A];
	const vitB1Data = data?.values[SectionValueType.VITAMIN_B1];
	const vitB12Data = data?.values[SectionValueType.VITAMIN_B12];
	const vitB2Data = data?.values[SectionValueType.VITAMIN_B2];
	const vitB6Data = data?.values[SectionValueType.VITAMIN_B6];
	const vitCData = data?.values[SectionValueType.VITAMIN_C];
	const vitDData = data?.values[SectionValueType.VITAMIN_D];
	const vitEData = data?.values[SectionValueType.VITAMIN_E];

	const vitA: Measurement = {
		value: parseUnitValue(vitAData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const vitB1: Measurement = {
		value: parseUnitValue(vitB1Data, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const vitB12: Measurement = {
		value: parseUnitValue(vitB12Data, ` ${MICROGRAMS_UNIT.abbreviation}`),
		unit: MICROGRAMS_UNIT,
	};
	const vitB2: Measurement = {
		value: parseUnitValue(vitB2Data, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const vitB6: Measurement = {
		value: parseUnitValue(vitB6Data, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const vitC: Measurement = {
		value: parseUnitValue(vitCData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const vitD: Measurement = {
		value: parseUnitValue(vitDData, ` ${MICROGRAMS_UNIT.abbreviation}`),
		unit: MICROGRAMS_UNIT,
	};
	const vitE: Measurement = {
		value: parseUnitValue(vitEData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};

	return {
		vitA,
		vitB1,
		vitB12,
		vitB2,
		vitB6,
		vitC,
		vitD,
		vitE,
	};
};

export const extractMinerals = (data: Section) => {
	const saltData = data?.values[SectionValueType.SALT];
	const ironData = data?.values[SectionValueType.IRON];
	const zincData = data?.values[SectionValueType.ZINC];
	const magnesiumData = data?.values[SectionValueType.MAGNESIUM];
	const chlorideData = data?.values[SectionValueType.CHLORIDE];
	const manganeseData = data?.values[SectionValueType.MANGANESE];
	const sulfurData = data?.values[SectionValueType.SULFUR];
	const potassiumData = data?.values[SectionValueType.POTASSIUM];
	const fluorideData = data?.values[SectionValueType.FLUORIDE];
	const phosphorousData = data?.values[SectionValueType.PHOSPHOROUS];
	const copperData = data?.values[SectionValueType.COPPER];
	const calciumData = data?.values[SectionValueType.CALCIUM];
	const iodineData = data?.values[SectionValueType.IODINE];

	const salt: Measurement = {
		value: parseUnitValue(saltData, ` ${GRAMS_UNIT.abbreviation}`),
		unit: GRAMS_UNIT,
	};
	const iron: Measurement = {
		value: parseUnitValue(ironData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const zinc: Measurement = {
		value: parseUnitValue(zincData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const magnesium: Measurement = {
		value: parseUnitValue(
			magnesiumData,
			` ${MILLIGRAMS_UNIT.abbreviation}`
		),
		unit: MILLIGRAMS_UNIT,
	};
	const chloride: Measurement = {
		value: parseUnitValue(chlorideData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const manganese: Measurement = {
		value: parseUnitValue(
			manganeseData,
			` ${MILLIGRAMS_UNIT.abbreviation}`
		),
		unit: MILLIGRAMS_UNIT,
	};
	const sulfur: Measurement = {
		value: parseUnitValue(sulfurData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const potassium: Measurement = {
		value: parseUnitValue(
			potassiumData,
			` ${MILLIGRAMS_UNIT.abbreviation}`
		),
		unit: MILLIGRAMS_UNIT,
	};
	const fluoride: Measurement = {
		value: parseUnitValue(fluorideData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const phosphorous: Measurement = {
		value: parseUnitValue(
			phosphorousData,
			` ${MILLIGRAMS_UNIT.abbreviation}`
		),
		unit: MILLIGRAMS_UNIT,
	};
	const copper: Measurement = {
		value: parseUnitValue(copperData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const calcium: Measurement = {
		value: parseUnitValue(calciumData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MILLIGRAMS_UNIT,
	};
	const iodine: Measurement = {
		value: parseUnitValue(iodineData, ` ${MILLIGRAMS_UNIT.abbreviation}`),
		unit: MICROGRAMS_UNIT,
	};

	return {
		salt,
		iron,
		zinc,
		magnesium,
		chloride,
		manganese,
		sulfur,
		potassium,
		fluoride,
		phosphorous,
		copper,
		calcium,
		iodine,
	};
};

export const extractServingMeasurement = (data: Section) => {
	const matches = data.name.match(/\((\d+\,?\d?)\s(\w+)\)/);
	if (matches) {
		const abbreviation = matches[2];

		const value = parseInt(matches[1].replace(",", "."));
		const measurement: Measurement = {
			value,
			unit: {
				name: abbreviation === "g" ? "grams" : "milliliters",
				abbreviation,
			},
		};
		return measurement;
	}

	return undefined;
};

export const extractServingDataSections = (html: CheerioAPI) => {
	const firstServingSection = html(SERVING_SELECTOR).get(0);
	const firstServingSectionEl = cheerio.load(firstServingSection);
	const servingName = cheerio
		.load(firstServingSectionEl(SERVING_TITLE_SELECTOR).text())
		.text();
	const servingSectionDivs = cheerio.load(firstServingSection)("div");

	const servingDataRows = servingSectionDivs.filter(
		(i, el) => el.attribs["style"] === "padding:0px 0px 2px 0px;"
	);

	const section: Section = { name: servingName, values: {} };

	servingDataRows.each((i, el) => {
		const valueName = cheerio.load(el)("div").eq(1).text().replace(":", "");
		const value = cheerio.load(el)("div").eq(2).text();
		section.values[valueName] = value;
	});

	return section;
};

export const buildConnectOrCreateObject = (
	measurement: Measurement | undefined
) => {
	const connectOrCreateObject: Prisma.UnitCreateOrConnectWithoutMeasurementsInput =
		{
			where: {
				abbreviation: measurement?.unit?.abbreviation ?? undefined,
			},
			create: {
				name: measurement?.unit?.name ?? null,
				abbreviation: measurement?.unit?.abbreviation ?? null,
			},
		};

	return connectOrCreateObject;
};

export const buildMeasurementCreateObject = (measurement: Measurement) => {
	const measurementCreateObject: MeasurementCreateObject = {
		value: measurement?.value ?? null,
		unit: {
			connectOrCreate: buildConnectOrCreateObject(measurement ?? null),
		},
	};

	return measurementCreateObject;
};
