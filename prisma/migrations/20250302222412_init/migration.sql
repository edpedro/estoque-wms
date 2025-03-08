/*
  Warnings:

  - You are about to drop the column `category` on the `items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "category";

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "companyid" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdby" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "create_id" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_item" (
    "categoryId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "category_item_pkey" PRIMARY KEY ("categoryId","itemId")
);

-- CreateIndex
CREATE INDEX "category_name_idx" ON "category"("name");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_create_id_fkey" FOREIGN KEY ("create_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_item" ADD CONSTRAINT "category_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_item" ADD CONSTRAINT "category_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
