/*
  Warnings:

  - Added the required column `pincode_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `pincode_id` INTEGER NOT NULL,
    ADD COLUMN `state_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Data` ADD COLUMN `status_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Data` ADD CONSTRAINT `Data_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `State`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_pincode_id_fkey` FOREIGN KEY (`pincode_id`) REFERENCES `Pincode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
