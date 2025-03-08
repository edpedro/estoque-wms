/*
  Warnings:

  - You are about to drop the column `companyid` on the `category` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "companyid",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
