/*
  Warnings:

  - You are about to alter the column `reservedQuantity` on the `Stock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `invoiceQuantity` on the `Stock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `divergenceQuantity` on the `Stock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `currentBalance` on the `Stock` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "reservedQuantity" SET DATA TYPE INTEGER,
ALTER COLUMN "invoiceQuantity" SET DATA TYPE INTEGER,
ALTER COLUMN "divergenceQuantity" SET DATA TYPE INTEGER,
ALTER COLUMN "currentBalance" SET DATA TYPE INTEGER;
