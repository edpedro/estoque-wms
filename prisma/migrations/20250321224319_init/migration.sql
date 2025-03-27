/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId,itemId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stock_invoiceId_itemId_key" ON "Stock"("invoiceId", "itemId");
