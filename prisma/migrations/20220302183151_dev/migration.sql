-- DropForeignKey
ALTER TABLE `Carbohydrate` DROP FOREIGN KEY `Carbohydrate_sugarCarbohydrateId_fkey`;

-- DropForeignKey
ALTER TABLE `Carbohydrate` DROP FOREIGN KEY `Carbohydrate_totalCarbohydrateId_fkey`;

-- DropForeignKey
ALTER TABLE `Fat` DROP FOREIGN KEY `Fat_monosaturatedFatId_fkey`;

-- DropForeignKey
ALTER TABLE `Fat` DROP FOREIGN KEY `Fat_polyunsaturatedFatId_fkey`;

-- DropForeignKey
ALTER TABLE `Fat` DROP FOREIGN KEY `Fat_saturatedFatId_fkey`;

-- DropForeignKey
ALTER TABLE `Fat` DROP FOREIGN KEY `Fat_transFatId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_servingId_fkey`;

-- AlterTable
ALTER TABLE `Carbohydrate` MODIFY `totalCarbohydrateId` INTEGER NULL,
    MODIFY `sugarCarbohydrateId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Fat` MODIFY `saturatedFatId` INTEGER NULL,
    MODIFY `monosaturatedFatId` INTEGER NULL,
    MODIFY `polyunsaturatedFatId` INTEGER NULL,
    MODIFY `transFatId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Measurement` MODIFY `value` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `servingId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Unit` MODIFY `abbreviation` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Fat` ADD CONSTRAINT `Fat_saturatedFatId_fkey` FOREIGN KEY (`saturatedFatId`) REFERENCES `SaturatedFat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fat` ADD CONSTRAINT `Fat_monosaturatedFatId_fkey` FOREIGN KEY (`monosaturatedFatId`) REFERENCES `MonosaturatedFat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fat` ADD CONSTRAINT `Fat_polyunsaturatedFatId_fkey` FOREIGN KEY (`polyunsaturatedFatId`) REFERENCES `PolyunsaturatedFat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fat` ADD CONSTRAINT `Fat_transFatId_fkey` FOREIGN KEY (`transFatId`) REFERENCES `TransFat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carbohydrate` ADD CONSTRAINT `Carbohydrate_totalCarbohydrateId_fkey` FOREIGN KEY (`totalCarbohydrateId`) REFERENCES `TotalCarbohydrate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carbohydrate` ADD CONSTRAINT `Carbohydrate_sugarCarbohydrateId_fkey` FOREIGN KEY (`sugarCarbohydrateId`) REFERENCES `SugarCarbohydrate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_servingId_fkey` FOREIGN KEY (`servingId`) REFERENCES `Serving`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
