import { Unit } from "./interfaces";

export const BASE_URL = "https://fddb.info";
export const SEARCH_ROUTE = "/db/de/suche/?search=";
export const ALL_ELEMENTS_SELECTOR = "div.rla > a,div.rlb > a";
export const LABELS_SELECTOR = "div.standardcontent table";
export const LABELS_FALSE_POSITIVES = [
	"Foto hochladen",
	"Schreibe eine Bewertung",
	"Angaben korrigieren",
	"Angaben noch nicht bestätigt",
	"Weitere Bewertungen anzeigen",
	"Weniger Bewertungen anzeigen",
	"Die Angaben beziehen",
	"Dieses Produkt benötigt",
];
export const CONFIRMED_LABELS = [
	"Beinhaltet viel Fett",
	"Beinhaltet viel Zucker",
	"Vegetarisch",
	"Vegetarisch (vegan)",
	"Glutenfrei",
	"Laktosefrei",
	"Fructosefrei",
];
export const EAN_SELECTOR = "div.standardcontent div p:last";
export const MANUFACTURER_SELECTOR =
	"div.standardcontent div p:nth-last-child(3)";
export const GROUP_SELECTOR = "div.standardcontent div p:nth-last-child(2)";
export const JOULES_SELECTOR = "div:eq(0)";
export const CALORIES_SELECTOR = "div:eq(1)";
export const PROTEIN_SELECTOR = "div:eq(2)";
export const CARBOHYDRATE_SELECTOR = "div:eq(3)";
export const SUGAR_SELECTOR = "div:eq(4)";
export const FAT_SELECTOR = "div:eq(5)";
export const FIBER_SELECTOR = "div:eq(6)";
export const VITAMIN_C_SELECTOR = "div:eq(9)";
export const VITAMIN_A_SELECTOR = "div:eq(10)";
export const VITAMIN_D_SELECTOR = "div:eq(11)";
export const VITAMIN_E_SELECTOR = "div:eq(12)";
export const VITAMIN_B1_SELECTOR = "div:eq(13)";
export const VITAMIN_B2_SELECTOR = "div:eq(14)";
export const VITAMIN_B6_SELECTOR = "div:eq(15)";
export const VITAMIN_B12_SELECTOR = "div:eq(16)";
export const SALT_SELECTOR = "div:eq(17)";
export const IRON_SELECTOR = "div:eq(18)";
export const ZINC_SELECTOR = "div:eq(19)";
export const MAGNESIUM_SELECTOR = "div:eq(20)";
export const CHLORIDE_SELECTOR = "div:eq(21)";
export const MANGANESE_SELECTOR = "div:eq(22)";
export const SULFUR_SELECTOR = "div:eq(23)";
export const POTASSIUM_SELECTOR = "div:eq(24)";
export const CALCIUM_SELECTOR = "div:eq(25)";
export const PHOSPHORUS_SELECTOR = "div:eq(26)";
export const COPPER_SELECTOR = "div:eq(27)";
export const FLUORIDE_SELECTOR = "div:eq(28)";
export const IODINE_SELECTOR = "div:eq(29)";
export const VALUES_SELECTOR = "div.sidrow";
export const SERVING_SELECTOR = "div.serva";
export const SERVING_TITLE_SELECTOR = "a.servb";
export const SERVING_CONTENT_SELECTOR = "a.servb";
export const ALPHANUMERIC: string = "abcdefghijklmnopqrstuvwxyz0123456789";
export const MILLIGRAMS_UNIT: Unit = { name: "milligrams", abbreviation: "mg" };
export const BREAD_UNITS_UNIT: Unit = { name: "bread units", abbreviation: "" };
export const MICROGRAMS_UNIT: Unit = { name: "micrograms", abbreviation: "μg" };
export const GRAMS_UNIT: Unit = { name: "grams", abbreviation: "g" };
export const PERCENT_UNIT: Unit = { name: "percent", abbreviation: "%" };
export const KILOJOULES_UNIT: Unit = { name: "kilojoules", abbreviation: "kJ" };
export const KILOCALORIES_UNIT: Unit = {
	name: "kilocalories",
	abbreviation: "kcal",
};
