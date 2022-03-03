/*
  Warnings:

  - You are about to drop the column `url` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Resource` DROP COLUMN `url`,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;
