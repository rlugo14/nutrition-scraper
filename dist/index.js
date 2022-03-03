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
const helpers_1 = require("./helpers");
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const interfaces_1 = require("./interfaces");
const progress_1 = __importDefault(require("progress"));
const axios = axios_1.default.create();
const prisma = new client_1.PrismaClient();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const resources = yield prisma.resource.findMany();
    console.log(resources.length);
    const labels = yield prisma.label.findMany();
    if (labels.length < 1) {
        yield (0, helpers_1.createAllLabels)(prisma);
        labels.push(...(yield prisma.label.findMany()));
    }
    const bar = new progress_1.default(`Scraping products [ :bar ] :percent :etas`, {
        total: resources.length,
        clear: true,
    });
    // const random = Math.floor(Math.random() * resources.length - 1);
    for (let i = 0; i < resources.length; i++) {
        const html = yield (0, helpers_1.extractHtml)(axios, [resources[i].slug]);
        if (html === undefined)
            continue;
        const resourceLabels = (0, helpers_1.extractAndMatchLabels)(html, labels);
        const resourceEan = (0, helpers_1.extractEan)(html);
        const resourceManufacturer = (0, helpers_1.extractManufacturer)(html);
        const resourceGroup = (0, helpers_1.extractGroup)(html);
        const dataSections = (0, helpers_1.extractDataSections)(html);
        const nutritionSectionData = (0, helpers_1.extractSectionData)(dataSections, interfaces_1.SectionType.NUTRITIONS);
        const resourceEnergy = (0, helpers_1.extractEnergy)(nutritionSectionData);
        const resourceProtein = (0, helpers_1.extractProtein)(nutritionSectionData);
        const resourceCarbohydrates = (0, helpers_1.extractCarbohydrates)(nutritionSectionData);
        const resourceFat = (0, helpers_1.extractFat)(nutritionSectionData);
        const resourceFiber = (0, helpers_1.extractFiber)(nutritionSectionData);
        const resourceBreadUnit = (0, helpers_1.extractBreadUnit)(nutritionSectionData);
        const resourceCholesterol = (0, helpers_1.extractCholesterol)(nutritionSectionData);
        const resourceWater = (0, helpers_1.extractWater)(nutritionSectionData);
        const vitaminSectionData = (0, helpers_1.extractSectionData)(dataSections, interfaces_1.SectionType.VITAMINS);
        const resourceVitamins = (0, helpers_1.extractVitamins)(vitaminSectionData);
        const mineralSectionData = (0, helpers_1.extractSectionData)(dataSections, interfaces_1.SectionType.MINERALS);
        const resourceMinerals = (0, helpers_1.extractMinerals)(mineralSectionData);
        const servingData = (0, helpers_1.extractServingDataSections)(html);
        const servingMeasurement = (0, helpers_1.extractServingMeasurement)(servingData);
        yield prisma.product
            .create({
            data: {
                group: resourceGroup,
                manufacturer: resourceManufacturer,
                name: resources[i].displayName,
                serving: {
                    create: {
                        name: servingData.name,
                        measurement: {
                            create: (0, helpers_1.buildMeasurementCreateObject)(servingMeasurement),
                        },
                    },
                },
                ean: resourceEan,
                labels: {
                    connect: [
                        ...labels
                            .filter((label) => resourceLabels.includes(label))
                            .map((label) => ({ id: label.id })),
                    ],
                },
            },
        })
            .then((product) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.nutritionFact
                .create({
                data: {
                    protein: {
                        create: {
                            measurements: {
                                create: (0, helpers_1.buildMeasurementCreateObject)(resourceProtein),
                            },
                        },
                    },
                    carbohydrate: {
                        create: {
                            total: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceCarbohydrates.carbs),
                                    },
                                },
                            },
                            sugar: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceCarbohydrates.sugarCarbs),
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
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceFat),
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
                                            connectOrCreate: (0, helpers_1.buildConnectOrCreateObject)(resourceEnergy.calories),
                                        },
                                    },
                                    {
                                        value: resourceEnergy
                                            .calorificValues.value,
                                        unit: {
                                            connectOrCreate: (0, helpers_1.buildConnectOrCreateObject)(resourceEnergy.calorificValues),
                                        },
                                    },
                                ],
                            },
                        },
                    },
                    fiber: {
                        create: {
                            measurements: {
                                create: (0, helpers_1.buildMeasurementCreateObject)(resourceFiber),
                            },
                        },
                    },
                    minerals: {
                        create: {
                            calcium: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.calcium),
                                    },
                                },
                            },
                            chloride: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.chloride),
                                    },
                                },
                            },
                            copper: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.copper),
                                    },
                                },
                            },
                            fluoride: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.fluoride),
                                    },
                                },
                            },
                            iodine: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.iodine),
                                    },
                                },
                            },
                            iron: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.iron),
                                    },
                                },
                            },
                            magnesium: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.magnesium),
                                    },
                                },
                            },
                            manganese: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.manganese),
                                    },
                                },
                            },
                            phosphorous: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.phosphorous),
                                    },
                                },
                            },
                            potassium: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.potassium),
                                    },
                                },
                            },
                            salt: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.salt),
                                    },
                                },
                            },
                            sulfur: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.sulfur),
                                    },
                                },
                            },
                            zinc: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceMinerals.zinc),
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
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceVitamins.vitA),
                                    },
                                },
                            },
                            B12: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceVitamins.vitB12),
                                    },
                                },
                            },
                            B1: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceVitamins.vitB1),
                                    },
                                },
                            },
                            B2: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceVitamins.vitB2),
                                    },
                                },
                            },
                            B6: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceVitamins.vitB6),
                                    },
                                },
                            },
                            C: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceVitamins.vitC),
                                    },
                                },
                            },
                            D: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceVitamins.vitD),
                                    },
                                },
                            },
                            E: {
                                create: {
                                    measurement: {
                                        create: (0, helpers_1.buildMeasurementCreateObject)(resourceVitamins.vitE),
                                    },
                                },
                            },
                        },
                    },
                    water: {
                        create: {
                            measurements: {
                                create: (0, helpers_1.buildMeasurementCreateObject)(resourceWater),
                            },
                        },
                    },
                    cholesterol: {
                        create: {
                            measurements: {
                                create: (0, helpers_1.buildMeasurementCreateObject)(resourceCholesterol),
                            },
                        },
                    },
                    product: { connect: { id: product.id } },
                },
            })
                .then((nutritionFact) => __awaiter(void 0, void 0, void 0, function* () {
                yield prisma.product.update({
                    where: { id: nutritionFact.productId },
                    data: {
                        nutritionFactId: nutritionFact.id,
                    },
                });
            }))
                .then(() => bar.tick())
                .catch((err) => console.error(err, resources[i].slug));
        }))
            .catch((err) => console.error(err, resources[i].slug));
    }
}))();
//# sourceMappingURL=index.js.map