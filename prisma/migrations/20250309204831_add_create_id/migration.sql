/*
  Warnings:

  - You are about to drop the column `create_id` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `create_id` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createId` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createId` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_create_id_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_create_id_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "create_id",
ADD COLUMN     "createId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "items" DROP COLUMN "create_id",
DROP COLUMN "createdBy",
ADD COLUMN     "createId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "addresses_name_key" ON "addresses"("name");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_createId_fkey" FOREIGN KEY ("createId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_createId_fkey" FOREIGN KEY ("createId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
