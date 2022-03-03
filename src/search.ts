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
	const labels = await prisma.product.findMany({
		select: {
			ean: true,
			serving: { include: { measurement: true } },
			group: true,
			name: true,
		},
		where: { labels: { every: { name: "Vegetarisch" } } },
		take: 100,
	});
	console.log(JSON.stringify(labels));
})();
