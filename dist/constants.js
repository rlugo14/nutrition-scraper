"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KILOCALORIES_UNIT = exports.KILOJOULES_UNIT = exports.PERCENT_UNIT = exports.GRAMS_UNIT = exports.MICROGRAMS_UNIT = exports.BREAD_UNITS_UNIT = exports.MILLIGRAMS_UNIT = exports.ALPHANUMERIC = exports.SERVING_CONTENT_SELECTOR = exports.SERVING_TITLE_SELECTOR = exports.SERVING_SELECTOR = exports.VALUES_SELECTOR = exports.IODINE_SELECTOR = exports.FLUORIDE_SELECTOR = exports.COPPER_SELECTOR = exports.PHOSPHORUS_SELECTOR = exports.CALCIUM_SELECTOR = exports.POTASSIUM_SELECTOR = exports.SULFUR_SELECTOR = exports.MANGANESE_SELECTOR = exports.CHLORIDE_SELECTOR = exports.MAGNESIUM_SELECTOR = exports.ZINC_SELECTOR = exports.IRON_SELECTOR = exports.SALT_SELECTOR = exports.VITAMIN_B12_SELECTOR = exports.VITAMIN_B6_SELECTOR = exports.VITAMIN_B2_SELECTOR = exports.VITAMIN_B1_SELECTOR = exports.VITAMIN_E_SELECTOR = exports.VITAMIN_D_SELECTOR = exports.VITAMIN_A_SELECTOR = exports.VITAMIN_C_SELECTOR = exports.FIBER_SELECTOR = exports.FAT_SELECTOR = exports.SUGAR_SELECTOR = exports.CARBOHYDRATE_SELECTOR = exports.PROTEIN_SELECTOR = exports.CALORIES_SELECTOR = exports.JOULES_SELECTOR = exports.GROUP_SELECTOR = exports.MANUFACTURER_SELECTOR = exports.EAN_SELECTOR = exports.CONFIRMED_LABELS = exports.LABELS_FALSE_POSITIVES = exports.LABELS_SELECTOR = exports.ALL_ELEMENTS_SELECTOR = exports.SEARCH_ROUTE = exports.BASE_URL = void 0;
exports.BASE_URL = "https://fddb.info";
exports.SEARCH_ROUTE = "/db/de/suche/?search=";
exports.ALL_ELEMENTS_SELECTOR = "div.rla > a,div.rlb > a";
exports.LABELS_SELECTOR = "div.standardcontent table";
exports.LABELS_FALSE_POSITIVES = [
    "Foto hochladen",
    "Schreibe eine Bewertung",
    "Angaben korrigieren",
    "Angaben noch nicht bestätigt",
    "Weitere Bewertungen anzeigen",
    "Weniger Bewertungen anzeigen",
    "Die Angaben beziehen",
    "Dieses Produkt benötigt",
];
exports.CONFIRMED_LABELS = [
    "Beinhaltet viel Fett",
    "Beinhaltet viel Zucker",
    "Vegetarisch",
    "Vegetarisch (vegan)",
    "Glutenfrei",
    "Laktosefrei",
    "Fructosefrei",
];
exports.EAN_SELECTOR = "div.standardcontent div p:last";
exports.MANUFACTURER_SELECTOR = "div.standardcontent div p:nth-last-child(3)";
exports.GROUP_SELECTOR = "div.standardcontent div p:nth-last-child(2)";
exports.JOULES_SELECTOR = "div:eq(0)";
exports.CALORIES_SELECTOR = "div:eq(1)";
exports.PROTEIN_SELECTOR = "div:eq(2)";
exports.CARBOHYDRATE_SELECTOR = "div:eq(3)";
exports.SUGAR_SELECTOR = "div:eq(4)";
exports.FAT_SELECTOR = "div:eq(5)";
exports.FIBER_SELECTOR = "div:eq(6)";
exports.VITAMIN_C_SELECTOR = "div:eq(9)";
exports.VITAMIN_A_SELECTOR = "div:eq(10)";
exports.VITAMIN_D_SELECTOR = "div:eq(11)";
exports.VITAMIN_E_SELECTOR = "div:eq(12)";
exports.VITAMIN_B1_SELECTOR = "div:eq(13)";
exports.VITAMIN_B2_SELECTOR = "div:eq(14)";
exports.VITAMIN_B6_SELECTOR = "div:eq(15)";
exports.VITAMIN_B12_SELECTOR = "div:eq(16)";
exports.SALT_SELECTOR = "div:eq(17)";
exports.IRON_SELECTOR = "div:eq(18)";
exports.ZINC_SELECTOR = "div:eq(19)";
exports.MAGNESIUM_SELECTOR = "div:eq(20)";
exports.CHLORIDE_SELECTOR = "div:eq(21)";
exports.MANGANESE_SELECTOR = "div:eq(22)";
exports.SULFUR_SELECTOR = "div:eq(23)";
exports.POTASSIUM_SELECTOR = "div:eq(24)";
exports.CALCIUM_SELECTOR = "div:eq(25)";
exports.PHOSPHORUS_SELECTOR = "div:eq(26)";
exports.COPPER_SELECTOR = "div:eq(27)";
exports.FLUORIDE_SELECTOR = "div:eq(28)";
exports.IODINE_SELECTOR = "div:eq(29)";
exports.VALUES_SELECTOR = "div.sidrow";
exports.SERVING_SELECTOR = "div.serva";
exports.SERVING_TITLE_SELECTOR = "a.servb";
exports.SERVING_CONTENT_SELECTOR = "a.servb";
exports.ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyz0123456789";
exports.MILLIGRAMS_UNIT = { name: "milligrams", abbreviation: "mg" };
exports.BREAD_UNITS_UNIT = { name: "bread units", abbreviation: "" };
exports.MICROGRAMS_UNIT = { name: "micrograms", abbreviation: "μg" };
exports.GRAMS_UNIT = { name: "grams", abbreviation: "g" };
exports.PERCENT_UNIT = { name: "percent", abbreviation: "%" };
exports.KILOJOULES_UNIT = { name: "kilojoules", abbreviation: "kJ" };
exports.KILOCALORIES_UNIT = {
    name: "kilocalories",
    abbreviation: "kcal",
};
//# sourceMappingURL=constants.js.map