import {
	extractHtml,
	createAllLabels,
	extractAndMatchLabels,
	extractEan,
	extractManufacturer,
	extractGroup,
	extractDataSections,
	extractSectionData,
	extractEnergy,
	extractProtein,
	extractCarbohydrates,
	extractWater,
	extractFiber,
	extractVitamins,
	extractMinerals,
	extractServingDataSections,
	extractFat,
	extractBreadUnit,
	extractCholesterol,
	buildConnectOrCreateObject,
	buildMeasurementCreateObject,
	extractServingMeasurement,
} from "./helpers";
import axiosClient from "axios";
import { PrismaClient, Product } from "@prisma/client";
import { SectionType } from "./interfaces";
import cheerio from "cheerio";
import { SERVING_SELECTOR } from "./constants";
import { encode } from "utf8";
import ProgressBar from "progress";

const axios = axiosClient.create();
const prisma = new PrismaClient();

(async () => {
	const resources = await prisma.resource.findMany();
	console.log(resources.length);

	const labels = await prisma.label.findMany();

	if (labels.length < 1) {
		await createAllLabels(prisma);
		labels.push(...(await prisma.label.findMany()));
	}

	const bar = new ProgressBar(`Scraping products [ :bar ] :percent :etas`, {
		total: resources.length,
		clear: true,
	});

	// const random = Math.floor(Math.random() * resources.length - 1);
	for (let i = 0; i < resources.length; i++) {
		const html = await extractHtml(axios, [resources[i].slug]);
		if (html === undefined) continue;
		const resourceLabels = extractAndMatchLabels(html, labels);
		const resourceEan = extractEan(html);
		const resourceManufacturer = extractManufacturer(html);
		const resourceGroup = extractGroup(html);

		const dataSections = extractDataSections(html);
		const nutritionSectionData = extractSectionData(
			dataSections,
			SectionType.NUTRITIONS
		);
		const resourceEnergy = extractEnergy(nutritionSectionData);
		const resourceProtein = extractProtein(nutritionSectionData);
		const resourceCarbohydrates =
			extractCarbohydrates(nutritionSectionData);
		const resourceFat = extractFat(nutritionSectionData);
		const resourceFiber = extractFiber(nutritionSectionData);
		const resourceBreadUnit = extractBreadUnit(nutritionSectionData);
		const resourceCholesterol = extractCholesterol(nutritionSectionData);
		const resourceWater = extractWater(nutritionSectionData);

		const vitaminSectionData = extractSectionData(
			dataSections,
			SectionType.VITAMINS
		);
		const resourceVitamins = extractVitamins(vitaminSectionData);

		const mineralSectionData = extractSectionData(
			dataSections,
			SectionType.MINERALS
		);
		const resourceMinerals = extractMinerals(mineralSectionData);

		const servingData = extractServingDataSections(html);
		const servingMeasurement = extractServingMeasurement(servingData);

		await prisma.product
			.create({
				data: {
					group: resourceGroup,
					manufacturer: resourceManufacturer,
					name: resources[i].displayName,
					serving: {
						create: {
							name: servingData.name,
							measurement: {
								create: buildMeasurementCreateObject(
									servingMeasurement
								),
							},
						},
					},
					ean: resourceEan,
					labels: {
						connect: [
							...labels
								.filter((label) =>
									resourceLabels.includes(label)
								)
								.map((label) => ({ id: label.id })),
						],
					},
				},
			})
			.then(async (product) => {
				await prisma.nutritionFact
					.create({
						data: {
							protein: {
								create: {
									measurements: {
										create: buildMeasurementCreateObject(
											resourceProtein
										),
									},
								},
							},
							carbohydrate: {
								create: {
									total: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceCarbohydrates.carbs
												),
											},
										},
									},
									sugar: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceCarbohydrates.sugarCarbs
												),
											},
										},
									},
								},
							},
							fats: {
								create: {
									total: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceFat
												),
											},
										},
									},
								},
							},
							energy: {
								create: {
									measurements: {
										create: [
											{
												value: resourceEnergy.calories
													.value,
												unit: {
													connectOrCreate:
														buildConnectOrCreateObject(
															resourceEnergy.calories
														),
												},
											},
											{
												value: resourceEnergy
													.calorificValues.value,
												unit: {
													connectOrCreate:
														buildConnectOrCreateObject(
															resourceEnergy.calorificValues
														),
												},
											},
										],
									},
								},
							},
							fiber: {
								create: {
									measurements: {
										create: buildMeasurementCreateObject(
											resourceFiber
										),
									},
								},
							},
							minerals: {
								create: {
									calcium: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.calcium
												),
											},
										},
									},
									chloride: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.chloride
												),
											},
										},
									},
									copper: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.copper
												),
											},
										},
									},
									fluoride: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.fluoride
												),
											},
										},
									},
									iodine: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.iodine
												),
											},
										},
									},
									iron: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.iron
												),
											},
										},
									},
									magnesium: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.magnesium
												),
											},
										},
									},
									manganese: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.manganese
												),
											},
										},
									},
									phosphorous: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.phosphorous
												),
											},
										},
									},
									potassium: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.potassium
												),
											},
										},
									},
									salt: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.salt
												),
											},
										},
									},
									sulfur: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.sulfur
												),
											},
										},
									},
									zinc: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceMinerals.zinc
												),
											},
										},
									},
								},
							},
							vitamins: {
								create: {
									A: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceVitamins.vitA
												),
											},
										},
									},
									B12: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceVitamins.vitB12
												),
											},
										},
									},
									B1: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceVitamins.vitB1
												),
											},
										},
									},
									B2: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceVitamins.vitB2
												),
											},
										},
									},
									B6: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceVitamins.vitB6
												),
											},
										},
									},
									C: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceVitamins.vitC
												),
											},
										},
									},
									D: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceVitamins.vitD
												),
											},
										},
									},
									E: {
										create: {
											measurement: {
												create: buildMeasurementCreateObject(
													resourceVitamins.vitE
												),
											},
										},
									},
								},
							},
							water: {
								create: {
									measurements: {
										create: buildMeasurementCreateObject(
											resourceWater
										),
									},
								},
							},
							cholesterol: {
								create: {
									measurements: {
										create: buildMeasurementCreateObject(
											resourceCholesterol
										),
									},
								},
							},
							product: { connect: { id: product.id } },
						},
					})
					.then(async (nutritionFact) => {
						await prisma.product.update({
							where: { id: nutritionFact.productId },
							data: {
								nutritionFactId: nutritionFact.id,
							},
						});
					})
					.then(() => bar.tick())
					.catch((err) => console.error(err, resources[i].slug));
			})
			.catch((err) => console.error(err, resources[i].slug));
	}
})();
