/*
  Warnings:

  - Added the required column `city_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `city_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
