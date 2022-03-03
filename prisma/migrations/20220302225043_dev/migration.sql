/*
  Warnings:

  - Made the column `servingId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_servingId_fkey`;

-- DropIndex
DROP INDEX `Product_ean_key` ON `Product`;

-- AlterTable
ALTER TABLE `Product` MODIFY `servingId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_servingId_fkey` FOREIGN KEY (`servingId`) REFERENCES `Serving`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
