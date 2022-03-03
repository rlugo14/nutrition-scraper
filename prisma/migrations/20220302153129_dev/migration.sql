-- CreateTable
CREATE TABLE `Label` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Label_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalFatId` INTEGER NOT NULL,
    `saturatedFatId` INTEGER NOT NULL,
    `monosaturatedFatId` INTEGER NOT NULL,
    `polyunsaturatedFatId` INTEGER NOT NULL,
    `transFatId` INTEGER NOT NULL,

    UNIQUE INDEX `Fat_totalFatId_key`(`totalFatId`),
    UNIQUE INDEX `Fat_saturatedFatId_key`(`saturatedFatId`),
    UNIQUE INDEX `Fat_monosaturatedFatId_key`(`monosaturatedFatId`),
    UNIQUE INDEX `Fat_polyunsaturatedFatId_key`(`polyunsaturatedFatId`),
    UNIQUE INDEX `Fat_transFatId_key`(`transFatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TotalFat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaturatedFat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `SaturatedFat_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MonosaturatedFat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `MonosaturatedFat_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PolyunsaturatedFat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `PolyunsaturatedFat_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransFat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `TransFat_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carbohydrate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalCarbohydrateId` INTEGER NOT NULL,
    `sugarCarbohydrateId` INTEGER NOT NULL,

    UNIQUE INDEX `Carbohydrate_totalCarbohydrateId_key`(`totalCarbohydrateId`),
    UNIQUE INDEX `Carbohydrate_sugarCarbohydrateId_key`(`sugarCarbohydrateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TotalCarbohydrate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `TotalCarbohydrate_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SugarCarbohydrate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `SugarCarbohydrate_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vitamin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vitaminCId` INTEGER NULL,
    `vitaminAId` INTEGER NULL,
    `vitaminDId` INTEGER NULL,
    `vitaminEId` INTEGER NULL,
    `vitaminB1Id` INTEGER NULL,
    `vitaminB2Id` INTEGER NULL,
    `vitaminB6Id` INTEGER NULL,
    `vitaminB12Id` INTEGER NULL,

    UNIQUE INDEX `Vitamin_vitaminCId_key`(`vitaminCId`),
    UNIQUE INDEX `Vitamin_vitaminAId_key`(`vitaminAId`),
    UNIQUE INDEX `Vitamin_vitaminDId_key`(`vitaminDId`),
    UNIQUE INDEX `Vitamin_vitaminEId_key`(`vitaminEId`),
    UNIQUE INDEX `Vitamin_vitaminB1Id_key`(`vitaminB1Id`),
    UNIQUE INDEX `Vitamin_vitaminB2Id_key`(`vitaminB2Id`),
    UNIQUE INDEX `Vitamin_vitaminB6Id_key`(`vitaminB6Id`),
    UNIQUE INDEX `Vitamin_vitaminB12Id_key`(`vitaminB12Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VitaminC` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `VitaminC_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VitaminA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `VitaminA_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VitaminD` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `VitaminD_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VitaminE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `VitaminE_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VitaminB1` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `VitaminB1_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VitaminB2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `VitaminB2_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VitaminB6` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `VitaminB6_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VitaminB12` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `VitaminB12_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Salt_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zinc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Zinc_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Iron` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Iron_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Magnesium` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Magnesium_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chloride` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Chloride_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manganese` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Manganese_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sulfur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Sulfur_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Potassium` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Potassium_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fluoride` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Fluoride_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phosphorous` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Phosphorous_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Copper` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Copper_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Iodine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Iodine_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calcium` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `measurementId` INTEGER NOT NULL,

    UNIQUE INDEX `Calcium_measurementId_key`(`measurementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mineral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saltId` INTEGER NULL,
    `ironId` INTEGER NULL,
    `zincId` INTEGER NULL,
    `magnesiumId` INTEGER NULL,
    `chlorideId` INTEGER NULL,
    `manganeseId` INTEGER NULL,
    `sulfurId` INTEGER NULL,
    `potassiumId` INTEGER NULL,
    `fluorideId` INTEGER NULL,
    `phosphorousId` INTEGER NULL,
    `copperId` INTEGER NULL,
    `iodineId` INTEGER NULL,
    `calciumId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Unit_name_key`(`name`),
    UNIQUE INDEX `Unit_abbreviation_key`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Measurement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DECIMAL(65, 30) NOT NULL,
    `unitId` INTEGER NOT NULL,
    `proteinId` INTEGER NULL,
    `cholesterolId` INTEGER NULL,
    `fiberId` INTEGER NULL,
    `waterId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Serving` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `measurementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Energy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nutritionFactId` INTEGER NOT NULL,

    UNIQUE INDEX `Energy_nutritionFactId_key`(`nutritionFactId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Protein` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cholesterol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fiber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Water` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NutritionFact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proteinId` INTEGER NULL,
    `fatId` INTEGER NULL,
    `carbohydrateId` INTEGER NULL,
    `fiberId` INTEGER NULL,
    `vitaminId` INTEGER NULL,
    `mineralId` INTEGER NULL,
    `cholesterolId` INTEGER NULL,
    `waterId` INTEGER NULL,
    `productId` INTEGER NULL,

    UNIQUE INDEX `NutritionFact_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `ean` VARCHAR(191) NULL,
    `manufacturer` VARCHAR(191) NOT NULL,
    `group` VARCHAR(191) NOT NULL,
    `servingId` INTEGER NOT NULL,
    `nutritionFactId` INTEGER NULL,

    UNIQUE INDEX `Product_name_key`(`name`),
    UNIQUE INDEX `Product_ean_key`(`ean`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LabelToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LabelToProduct_AB_unique`(`A`, `B`),
    INDEX `_LabelToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MeasurementToVitamin` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MeasurementToVitamin_AB_unique`(`A`, `B`),
    INDEX `_MeasurementToVitamin_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EnergyToMeasurement` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EnergyToMeasurement_AB_unique`(`A`, `B`),
    INDEX `_EnergyToMeasurement_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fat` ADD CONSTRAINT `Fat_totalFatId_fkey` FOREIGN KEY (`totalFatId`) REFERENCES `TotalFat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fat` ADD CONSTRAINT `Fat_saturatedFatId_fkey` FOREIGN KEY (`saturatedFatId`) REFERENCES `SaturatedFat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fat` ADD CONSTRAINT `Fat_monosaturatedFatId_fkey` FOREIGN KEY (`monosaturatedFatId`) REFERENCES `MonosaturatedFat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fat` ADD CONSTRAINT `Fat_polyunsaturatedFatId_fkey` FOREIGN KEY (`polyunsaturatedFatId`) REFERENCES `PolyunsaturatedFat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fat` ADD CONSTRAINT `Fat_transFatId_fkey` FOREIGN KEY (`transFatId`) REFERENCES `TransFat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TotalFat` ADD CONSTRAINT `TotalFat_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaturatedFat` ADD CONSTRAINT `SaturatedFat_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonosaturatedFat` ADD CONSTRAINT `MonosaturatedFat_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PolyunsaturatedFat` ADD CONSTRAINT `PolyunsaturatedFat_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransFat` ADD CONSTRAINT `TransFat_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carbohydrate` ADD CONSTRAINT `Carbohydrate_totalCarbohydrateId_fkey` FOREIGN KEY (`totalCarbohydrateId`) REFERENCES `TotalCarbohydrate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carbohydrate` ADD CONSTRAINT `Carbohydrate_sugarCarbohydrateId_fkey` FOREIGN KEY (`sugarCarbohydrateId`) REFERENCES `SugarCarbohydrate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TotalCarbohydrate` ADD CONSTRAINT `TotalCarbohydrate_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SugarCarbohydrate` ADD CONSTRAINT `SugarCarbohydrate_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitamin` ADD CONSTRAINT `Vitamin_vitaminCId_fkey` FOREIGN KEY (`vitaminCId`) REFERENCES `VitaminC`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitamin` ADD CONSTRAINT `Vitamin_vitaminAId_fkey` FOREIGN KEY (`vitaminAId`) REFERENCES `VitaminA`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitamin` ADD CONSTRAINT `Vitamin_vitaminDId_fkey` FOREIGN KEY (`vitaminDId`) REFERENCES `VitaminD`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitamin` ADD CONSTRAINT `Vitamin_vitaminEId_fkey` FOREIGN KEY (`vitaminEId`) REFERENCES `VitaminE`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitamin` ADD CONSTRAINT `Vitamin_vitaminB1Id_fkey` FOREIGN KEY (`vitaminB1Id`) REFERENCES `VitaminB1`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitamin` ADD CONSTRAINT `Vitamin_vitaminB2Id_fkey` FOREIGN KEY (`vitaminB2Id`) REFERENCES `VitaminB2`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitamin` ADD CONSTRAINT `Vitamin_vitaminB6Id_fkey` FOREIGN KEY (`vitaminB6Id`) REFERENCES `VitaminB6`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vitamin` ADD CONSTRAINT `Vitamin_vitaminB12Id_fkey` FOREIGN KEY (`vitaminB12Id`) REFERENCES `VitaminB12`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VitaminC` ADD CONSTRAINT `VitaminC_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VitaminA` ADD CONSTRAINT `VitaminA_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VitaminD` ADD CONSTRAINT `VitaminD_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VitaminE` ADD CONSTRAINT `VitaminE_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VitaminB1` ADD CONSTRAINT `VitaminB1_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VitaminB2` ADD CONSTRAINT `VitaminB2_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VitaminB6` ADD CONSTRAINT `VitaminB6_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VitaminB12` ADD CONSTRAINT `VitaminB12_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Salt` ADD CONSTRAINT `Salt_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zinc` ADD CONSTRAINT `Zinc_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Iron` ADD CONSTRAINT `Iron_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Magnesium` ADD CONSTRAINT `Magnesium_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chloride` ADD CONSTRAINT `Chloride_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Manganese` ADD CONSTRAINT `Manganese_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sulfur` ADD CONSTRAINT `Sulfur_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Potassium` ADD CONSTRAINT `Potassium_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fluoride` ADD CONSTRAINT `Fluoride_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Phosphorous` ADD CONSTRAINT `Phosphorous_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Copper` ADD CONSTRAINT `Copper_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Iodine` ADD CONSTRAINT `Iodine_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calcium` ADD CONSTRAINT `Calcium_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_saltId_fkey` FOREIGN KEY (`saltId`) REFERENCES `Salt`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_zincId_fkey` FOREIGN KEY (`zincId`) REFERENCES `Zinc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_ironId_fkey` FOREIGN KEY (`ironId`) REFERENCES `Iron`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_magnesiumId_fkey` FOREIGN KEY (`magnesiumId`) REFERENCES `Magnesium`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_chlorideId_fkey` FOREIGN KEY (`chlorideId`) REFERENCES `Chloride`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_manganeseId_fkey` FOREIGN KEY (`manganeseId`) REFERENCES `Manganese`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_sulfurId_fkey` FOREIGN KEY (`sulfurId`) REFERENCES `Sulfur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_potassiumId_fkey` FOREIGN KEY (`potassiumId`) REFERENCES `Potassium`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_fluorideId_fkey` FOREIGN KEY (`fluorideId`) REFERENCES `Fluoride`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_phosphorousId_fkey` FOREIGN KEY (`phosphorousId`) REFERENCES `Phosphorous`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_copperId_fkey` FOREIGN KEY (`copperId`) REFERENCES `Copper`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_iodineId_fkey` FOREIGN KEY (`iodineId`) REFERENCES `Iodine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mineral` ADD CONSTRAINT `Mineral_calciumId_fkey` FOREIGN KEY (`calciumId`) REFERENCES `Calcium`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_proteinId_fkey` FOREIGN KEY (`proteinId`) REFERENCES `Protein`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_cholesterolId_fkey` FOREIGN KEY (`cholesterolId`) REFERENCES `Cholesterol`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_fiberId_fkey` FOREIGN KEY (`fiberId`) REFERENCES `Fiber`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_waterId_fkey` FOREIGN KEY (`waterId`) REFERENCES `Water`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Serving` ADD CONSTRAINT `Serving_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Energy` ADD CONSTRAINT `Energy_nutritionFactId_fkey` FOREIGN KEY (`nutritionFactId`) REFERENCES `NutritionFact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionFact` ADD CONSTRAINT `NutritionFact_fatId_fkey` FOREIGN KEY (`fatId`) REFERENCES `Fat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionFact` ADD CONSTRAINT `NutritionFact_carbohydrateId_fkey` FOREIGN KEY (`carbohydrateId`) REFERENCES `Carbohydrate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionFact` ADD CONSTRAINT `NutritionFact_vitaminId_fkey` FOREIGN KEY (`vitaminId`) REFERENCES `Vitamin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionFact` ADD CONSTRAINT `NutritionFact_mineralId_fkey` FOREIGN KEY (`mineralId`) REFERENCES `Mineral`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionFact` ADD CONSTRAINT `NutritionFact_proteinId_fkey` FOREIGN KEY (`proteinId`) REFERENCES `Protein`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionFact` ADD CONSTRAINT `NutritionFact_cholesterolId_fkey` FOREIGN KEY (`cholesterolId`) REFERENCES `Cholesterol`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionFact` ADD CONSTRAINT `NutritionFact_fiberId_fkey` FOREIGN KEY (`fiberId`) REFERENCES `Fiber`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionFact` ADD CONSTRAINT `NutritionFact_waterId_fkey` FOREIGN KEY (`waterId`) REFERENCES `Water`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionFact` ADD CONSTRAINT `NutritionFact_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_servingId_fkey` FOREIGN KEY (`servingId`) REFERENCES `Serving`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LabelToProduct` ADD FOREIGN KEY (`A`) REFERENCES `Label`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LabelToProduct` ADD FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MeasurementToVitamin` ADD FOREIGN KEY (`A`) REFERENCES `Measurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MeasurementToVitamin` ADD FOREIGN KEY (`B`) REFERENCES `Vitamin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EnergyToMeasurement` ADD FOREIGN KEY (`A`) REFERENCES `Energy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EnergyToMeasurement` ADD FOREIGN KEY (`B`) REFERENCES `Measurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
