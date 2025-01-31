/*
  Warnings:

  - You are about to drop the `surat_masuk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `surat_masuk` DROP FOREIGN KEY `surat_masuk_statusId_fkey`;

-- DropTable
DROP TABLE `surat_masuk`;

-- CreateTable
CREATE TABLE `suratmasuk` (
    `id` VARCHAR(191) NOT NULL,
    `noSurat` VARCHAR(191) NOT NULL,
    `asalSurat` VARCHAR(191) NOT NULL,
    `prihal` VARCHAR(191) NOT NULL,
    `tanggalSurat` DATETIME(3) NOT NULL,
    `tanggalTerimaSurat` DATETIME(3) NOT NULL,
    `statusId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `suratmasuk_noSurat_key`(`noSurat`),
    INDEX `suratmasuk_statusId_idx`(`statusId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `suratmasuk` ADD CONSTRAINT `suratmasuk_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `statussurat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
