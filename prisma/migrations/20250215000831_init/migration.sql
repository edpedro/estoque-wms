/*
  Warnings:

  - You are about to drop the column `createdAt` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `item` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `item` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "item" DROP COLUMN "createdAt",
DROP COLUMN "quantity",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
