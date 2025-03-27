/*
  Warnings:

  - You are about to drop the column `divergenceReason` on the `Stock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "divergenceReason";

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "divergenceReason" TEXT,
ADD COLUMN     "status" TEXT;
