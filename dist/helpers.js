"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMeasurementCreateObject = exports.buildConnectOrCreateObject = exports.extractServingDataSections = exports.extractServingMeasurement = exports.extractMinerals = exports.extractVitamins = exports.extractFiber = exports.extractWater = exports.extractCarbohydrates = exports.extractFat = exports.extractBreadUnit = exports.extractCholesterol = exports.extractProtein = exports.extractEnergy = exports.extractSectionData = exports.extractDataSections = exports.extractGroup = exports.extractManufacturer = exports.extractEan = exports.extractAndMatchLabels = exports.createAllLabels = exports.getIndexingTransactions = exports.resolvePromisesSequentially = exports.createDbTransactionsForSlugs = exports.extractHtml = exports.constructUrl = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const progress_1 = __importDefault(require("progress"));
const constants_1 = require("./constants");
const interfaces_1 = require("./interfaces");
const constructUrl = (slugs) => constants_1.BASE_URL + slugs.join(".");
exports.constructUrl = constructUrl;
const extractHtml = (axios, slugs) => __awaiter(void 0, void 0, void 0, function* () {
    const url = (0, exports.constructUrl)(slugs);
    try {
        const response = yield axios.get(url).then((resp) => {
            if (resp.status === 404) {
                throw new Error(`Resource not found: ${url}`);
            }
            return resp;
        });
        const html = response.data;
        return cheerio_1.default.load(html);
    }
    catch (error) {
        //TODO: Better Logging
        console.error(error.message);
        return undefined;
    }
});
exports.extractHtml = extractHtml;
const createDbTransactionsForSlugs = (prisma, page) => __awaiter(void 0, void 0, void 0, function* () {
    const allElements = page(constants_1.ALL_ELEMENTS_SELECTOR);
    const resourcesData = [];
    const promises = [];
    allElements.each((i, elem) => {
        const $ = cheerio_1.default.load(elem);
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
});
exports.createDbTransactionsForSlugs = createDbTransactionsForSlugs;
const saveResourceData = (prisma, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.resource
        .create({
        data: { displayName: data.displayName, slug: data.slug },
    })
        .catch((err) => console.log(err));
});
const resolvePromisesSequentially = (promises) => __awaiter(void 0, void 0, void 0, function* () {
    const bar = new progress_1.default(`Saving in Database [ :bar ] :percent :etas`, {
        total: promises.length,
        clear: true,
    });
    for (let i = 0; i < promises.length; i++) {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(promises[i].resolve());
                bar.tick();
            }, 3);
        });
    }
});
exports.resolvePromisesSequentially = resolvePromisesSequentially;
const getIndexingTransactions = (axios, prisma, queries) => __awaiter(void 0, void 0, void 0, function* () {
    const bar = new progress_1.default(`Extracting Data [ :bar ] :percent :etas`, {
        total: queries.length,
        clear: true,
    });
    const transactions = [];
    for (let idx in queries) {
        const query = queries[idx];
        const searchResultPage = yield (0, exports.extractHtml)(axios, [
            constants_1.SEARCH_ROUTE,
            query,
        ]);
        const newPromises = yield (0, exports.createDbTransactionsForSlugs)(prisma, searchResultPage);
        transactions.push(newPromises);
        bar.tick();
    }
    return transactions.flat();
});
exports.getIndexingTransactions = getIndexingTransactions;
const createAllLabels = (prisma) => __awaiter(void 0, void 0, void 0, function* () {
    const createManyData = [];
    constants_1.CONFIRMED_LABELS.forEach((label) => {
        createManyData.push({ name: label });
    });
    const response = yield prisma.label.createMany({ data: createManyData });
    console.log("created %d new labels.", response.count);
});
exports.createAllLabels = createAllLabels;
const extractAndMatchLabels = (html, labels) => {
    if (html) {
        const extractedLabels = html(constants_1.LABELS_SELECTOR);
        const matchedLabels = [];
        extractedLabels.each((idx, item) => {
            const extractedLabel = (0, cheerio_1.default)(item).text();
            const foundIdx = labels.findIndex((label) => label.name === extractedLabel);
            if (foundIdx > -1)
                matchedLabels.push(labels[foundIdx]);
        });
        return matchedLabels;
    }
    return undefined;
};
exports.extractAndMatchLabels = extractAndMatchLabels;
const extractEan = (html) => {
    const selectedText = html(constants_1.EAN_SELECTOR).text();
    const match = selectedText.match(/EAN: (\d+)/);
    return match ? match[1] : undefined;
};
exports.extractEan = extractEan;
const extractManufacturer = (html) => html(constants_1.MANUFACTURER_SELECTOR).text().replace("Hersteller: ", "");
exports.extractManufacturer = extractManufacturer;
const extractGroup = (html) => html(constants_1.GROUP_SELECTOR).text().replace("Produktgruppe: ", "");
exports.extractGroup = extractGroup;
const extractDataSections = (html) => {
    const sections = [];
    const rightColumnEl = html("div.standardcontent > div:eq(1)");
    const rowEls = cheerio_1.default.load(rightColumnEl.html());
    const rows = rowEls("div");
    let section;
    rows.each((i, el) => {
        const row = cheerio_1.default.load(el);
        const isHeaderEl = el.attribs["class"] === "itemsec2012";
        const isContentEl = el.attribs["style"] &&
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
        if (isLastElement)
            sections.push(section);
    });
    return sections;
};
exports.extractDataSections = extractDataSections;
const extractSectionData = (data, type) => data.find((section) => section.name.includes(type));
exports.extractSectionData = extractSectionData;
const parseUnitValue = (data, unitAbbreviation) => parseFloat(data === null || data === void 0 ? void 0 : data.replace(unitAbbreviation, "").replace(",", "."));
const extractEnergy = (data) => {
    const caloriesData = data.values[interfaces_1.SectionValueType.CALORIES];
    const calorificValueData = data.values[interfaces_1.SectionValueType.CALORIFIC_VALUE];
    const caloriesDefaultUnit = constants_1.KILOCALORIES_UNIT;
    const calorificValueDefaultUnit = constants_1.KILOJOULES_UNIT;
    const calories = {
        value: parseUnitValue(caloriesData, ` ${caloriesDefaultUnit.abbreviation}`),
        unit: caloriesDefaultUnit,
    };
    const calorificValues = {
        value: parseUnitValue(calorificValueData, ` ${calorificValueDefaultUnit.abbreviation}`),
        unit: calorificValueDefaultUnit,
    };
    return { calories, calorificValues };
};
exports.extractEnergy = extractEnergy;
const extractProtein = (data) => {
    const proteinData = data.values[interfaces_1.SectionValueType.PROTEIN];
    const defaultUnit = constants_1.GRAMS_UNIT;
    const protein = {
        value: parseUnitValue(proteinData, ` ${defaultUnit.abbreviation}`),
        unit: defaultUnit,
    };
    return protein;
};
exports.extractProtein = extractProtein;
const extractCholesterol = (data) => {
    const cholesterolData = data.values[interfaces_1.SectionValueType.CHOLESTEROL];
    const defaultUnit = constants_1.MILLIGRAMS_UNIT;
    const cholesterol = {
        value: parseUnitValue(cholesterolData, ` ${defaultUnit.abbreviation}`),
        unit: defaultUnit,
    };
    return cholesterol;
};
exports.extractCholesterol = extractCholesterol;
const extractBreadUnit = (data) => {
    const breadUnitData = data.values[interfaces_1.SectionValueType.BREAD_UNIT];
    const defaultUnit = constants_1.BREAD_UNITS_UNIT;
    const breadUnit = {
        value: parseUnitValue(breadUnitData, ` ${defaultUnit.abbreviation}`),
        unit: defaultUnit,
    };
    return breadUnit;
};
exports.extractBreadUnit = extractBreadUnit;
const extractFat = (data) => {
    const fatsData = data.values[interfaces_1.SectionValueType.FAT];
    const defaultUnit = constants_1.GRAMS_UNIT;
    const fat = {
        value: parseUnitValue(fatsData, ` ${defaultUnit.abbreviation}`),
        unit: defaultUnit,
    };
    return fat;
};
exports.extractFat = extractFat;
const extractCarbohydrates = (data) => {
    const carbsData = data.values[interfaces_1.SectionValueType.CARBOHYDRATES];
    const sugarCarbsData = data.values[interfaces_1.SectionValueType.SUGAR];
    const defaultUnit = constants_1.GRAMS_UNIT;
    const carbs = {
        value: parseUnitValue(carbsData, ` ${defaultUnit.abbreviation}`),
        unit: defaultUnit,
    };
    const sugarCarbs = {
        value: parseUnitValue(sugarCarbsData, ` ${defaultUnit.abbreviation}`),
        unit: defaultUnit,
    };
    return { carbs, sugarCarbs };
};
exports.extractCarbohydrates = extractCarbohydrates;
const extractWater = (data) => {
    const waterData = data.values[interfaces_1.SectionValueType.WATER];
    const water = {
        value: parseUnitValue(waterData, constants_1.PERCENT_UNIT.abbreviation),
        unit: constants_1.PERCENT_UNIT,
    };
    return water;
};
exports.extractWater = extractWater;
const extractFiber = (data) => {
    const fiberData = data.values[interfaces_1.SectionValueType.FIBER];
    const defaultUnit = constants_1.GRAMS_UNIT;
    const fiber = {
        value: parseUnitValue(fiberData, ` ${defaultUnit.abbreviation}`),
        unit: defaultUnit,
    };
    return fiber;
};
exports.extractFiber = extractFiber;
const extractVitamins = (data) => {
    const vitAData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.VITAMIN_A];
    const vitB1Data = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.VITAMIN_B1];
    const vitB12Data = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.VITAMIN_B12];
    const vitB2Data = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.VITAMIN_B2];
    const vitB6Data = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.VITAMIN_B6];
    const vitCData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.VITAMIN_C];
    const vitDData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.VITAMIN_D];
    const vitEData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.VITAMIN_E];
    const vitA = {
        value: parseUnitValue(vitAData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const vitB1 = {
        value: parseUnitValue(vitB1Data, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const vitB12 = {
        value: parseUnitValue(vitB12Data, ` ${constants_1.MICROGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MICROGRAMS_UNIT,
    };
    const vitB2 = {
        value: parseUnitValue(vitB2Data, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const vitB6 = {
        value: parseUnitValue(vitB6Data, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const vitC = {
        value: parseUnitValue(vitCData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const vitD = {
        value: parseUnitValue(vitDData, ` ${constants_1.MICROGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MICROGRAMS_UNIT,
    };
    const vitE = {
        value: parseUnitValue(vitEData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
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
exports.extractVitamins = extractVitamins;
const extractMinerals = (data) => {
    const saltData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.SALT];
    const ironData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.IRON];
    const zincData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.ZINC];
    const magnesiumData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.MAGNESIUM];
    const chlorideData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.CHLORIDE];
    const manganeseData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.MANGANESE];
    const sulfurData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.SULFUR];
    const potassiumData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.POTASSIUM];
    const fluorideData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.FLUORIDE];
    const phosphorousData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.PHOSPHOROUS];
    const copperData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.COPPER];
    const calciumData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.CALCIUM];
    const iodineData = data === null || data === void 0 ? void 0 : data.values[interfaces_1.SectionValueType.IODINE];
    const salt = {
        value: parseUnitValue(saltData, ` ${constants_1.GRAMS_UNIT.abbreviation}`),
        unit: constants_1.GRAMS_UNIT,
    };
    const iron = {
        value: parseUnitValue(ironData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const zinc = {
        value: parseUnitValue(zincData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const magnesium = {
        value: parseUnitValue(magnesiumData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const chloride = {
        value: parseUnitValue(chlorideData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const manganese = {
        value: parseUnitValue(manganeseData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const sulfur = {
        value: parseUnitValue(sulfurData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const potassium = {
        value: parseUnitValue(potassiumData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const fluoride = {
        value: parseUnitValue(fluorideData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const phosphorous = {
        value: parseUnitValue(phosphorousData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const copper = {
        value: parseUnitValue(copperData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const calcium = {
        value: parseUnitValue(calciumData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MILLIGRAMS_UNIT,
    };
    const iodine = {
        value: parseUnitValue(iodineData, ` ${constants_1.MILLIGRAMS_UNIT.abbreviation}`),
        unit: constants_1.MICROGRAMS_UNIT,
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
exports.extractMinerals = extractMinerals;
const extractServingMeasurement = (data) => {
    const matches = data.name.match(/\((\d+\,?\d?)\s(\w+)\)/);
    if (matches) {
        const abbreviation = matches[2];
        const value = parseInt(matches[1].replace(",", "."));
        const measurement = {
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
exports.extractServingMeasurement = extractServingMeasurement;
const extractServingDataSections = (html) => {
    const firstServingSection = html(constants_1.SERVING_SELECTOR).get(0);
    const firstServingSectionEl = cheerio_1.default.load(firstServingSection);
    const servingName = cheerio_1.default
        .load(firstServingSectionEl(constants_1.SERVING_TITLE_SELECTOR).text())
        .text();
    const servingSectionDivs = cheerio_1.default.load(firstServingSection)("div");
    const servingDataRows = servingSectionDivs.filter((i, el) => el.attribs["style"] === "padding:0px 0px 2px 0px;");
    const section = { name: servingName, values: {} };
    servingDataRows.each((i, el) => {
        const valueName = cheerio_1.default.load(el)("div").eq(1).text().replace(":", "");
        const value = cheerio_1.default.load(el)("div").eq(2).text();
        section.values[valueName] = value;
    });
    return section;
};
exports.extractServingDataSections = extractServingDataSections;
const buildConnectOrCreateObject = (measurement) => {
    var _a, _b, _c, _d, _e, _f;
    const connectOrCreateObject = {
        where: {
            abbreviation: (_b = (_a = measurement === null || measurement === void 0 ? void 0 : measurement.unit) === null || _a === void 0 ? void 0 : _a.abbreviation) !== null && _b !== void 0 ? _b : undefined,
        },
        create: {
            name: (_d = (_c = measurement === null || measurement === void 0 ? void 0 : measurement.unit) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : null,
            abbreviation: (_f = (_e = measurement === null || measurement === void 0 ? void 0 : measurement.unit) === null || _e === void 0 ? void 0 : _e.abbreviation) !== null && _f !== void 0 ? _f : null,
        },
    };
    return connectOrCreateObject;
};
exports.buildConnectOrCreateObject = buildConnectOrCreateObject;
const buildMeasurementCreateObject = (measurement) => {
    var _a;
    const measurementCreateObject = {
        value: (_a = measurement === null || measurement === void 0 ? void 0 : measurement.value) !== null && _a !== void 0 ? _a : null,
        unit: {
            connectOrCreate: (0, exports.buildConnectOrCreateObject)(measurement !== null && measurement !== void 0 ? measurement : null),
        },
    };
    return measurementCreateObject;
};
exports.buildMeasurementCreateObject = buildMeasurementCreateObject;
//# sourceMappingURL=helpers.js.map