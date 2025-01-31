-- CreateTable
CREATE TABLE `surat_masuk` (
    `id` VARCHAR(191) NOT NULL,
    `noSurat` VARCHAR(191) NOT NULL,
    `asalSurat` VARCHAR(191) NOT NULL,
    `prihal` VARCHAR(191) NOT NULL,
    `tanggalSurat` DATETIME(3) NOT NULL,
    `tanggalTerimaSurat` DATETIME(3) NOT NULL,
    `statusId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `surat_masuk_noSurat_key`(`noSurat`),
    INDEX `surat_masuk_statusId_idx`(`statusId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surat_keluar` (
    `id` VARCHAR(191) NOT NULL,
    `noSurat` VARCHAR(191) NOT NULL,
    `prihalSurat` VARCHAR(191) NOT NULL,
    `tanggalSurat` DATETIME(3) NOT NULL,
    `dibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `diupdate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `surat_keluar_noSurat_key`(`noSurat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status_surat` (
    `id` VARCHAR(191) NOT NULL,
    `namaStatus` VARCHAR(191) NOT NULL,
    `dibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `diupdate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `status_surat_namaStatus_key`(`namaStatus`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `surat_masuk` ADD CONSTRAINT `surat_masuk_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `status_surat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
