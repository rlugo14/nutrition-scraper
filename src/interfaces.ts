import { Prisma } from "@prisma/client";

export interface ResourcesData {
	displayName: string;
	slug: string;
}

export interface ResolvablePromise {
	resolve: () => void;
}

export interface Rows {
	[key: string]: string;
}

export interface Section {
	name: string;
	values?: Rows;
}

export enum SectionType {
	NUTRITIONS = "Nährwerte",
	MINERALS = "Mineralstoffe",
	VITAMINS = "Vitamine",
}
export enum SectionValueType {
	CALORIFIC_VALUE = "Brennwert",
	CALORIES = "Kalorien",
	PROTEIN = "Protein",
	CARBOHYDRATES = "Kohlenhydrate",
	SUGAR = "davon Zucker",
	FAT = "Fett",
	FIBER = "Ballaststoffe",
	CARBOHYDRATE_EXCHANGE = "Broteinheit",
	CHOLESTEROL = "Cholesterin",
	BREAD_UNIT = "Broteinheiten",
	WATER = "Wassergehalt",
	VITAMIN_C = "Vitamin C",
	VITAMIN_A = "Vitamin A",
	VITAMIN_D = "Vitamin D",
	VITAMIN_E = "Vitamin E",
	VITAMIN_B1 = "Vitamin B1",
	VITAMIN_B2 = "Vitamin B2",
	VITAMIN_B6 = "Vitamin B6",
	VITAMIN_B12 = "Vitamin B12",
	SALT = "Salz",
	IRON = "Eisen",
	ZINC = "Zink",
	MAGNESIUM = "Magnesium",
	CHLORIDE = "Chlorid",
	MANGANESE = "Mangan",
	SULFUR = "Schwefel",
	POTASSIUM = "Kalium",
	FLUORIDE = "Fluorid",
	PHOSPHOROUS = "Phosphor",
	COPPER = "Kupfer",
	CALCIUM = "Kalzium",
	IODINE = "Jod",
}

export interface Measurement {
	value: number;
	unit: Unit;
}

export interface Unit {
	name: string;
	abbreviation: string;
}

export interface MeasurementCreateObject {
	value: number;
	unit: {
		connectOrCreate: Prisma.UnitCreateOrConnectWithoutMeasurementsInput;
	};
}
