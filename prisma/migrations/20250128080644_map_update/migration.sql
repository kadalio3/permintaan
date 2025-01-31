/*
  Warnings:

  - You are about to drop the `status_surat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `surat_keluar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `surat_masuk` DROP FOREIGN KEY `surat_masuk_statusId_fkey`;

-- DropTable
DROP TABLE `status_surat`;

-- DropTable
DROP TABLE `surat_keluar`;

-- CreateTable
CREATE TABLE `suratkeluar` (
    `id` VARCHAR(191) NOT NULL,
    `noSurat` VARCHAR(191) NOT NULL,
    `prihalSurat` VARCHAR(191) NOT NULL,
    `tanggalSurat` DATETIME(3) NOT NULL,
    `dibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `diupdate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `suratkeluar_noSurat_key`(`noSurat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statussurat` (
    `id` VARCHAR(191) NOT NULL,
    `namaStatus` VARCHAR(191) NOT NULL,
    `dibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `diupdate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `statussurat_namaStatus_key`(`namaStatus`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `surat_masuk` ADD CONSTRAINT `surat_masuk_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `statussurat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
