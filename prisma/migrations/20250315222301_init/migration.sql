-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "divergence" BOOLEAN NOT NULL DEFAULT false,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "totalNf_value" DOUBLE PRECISION NOT NULL,
    "createId" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "stockTypeId" INTEGER,
    "addressId" INTEGER,
    "companyId" INTEGER NOT NULL,
    "lastUpdatedBy" TEXT NOT NULL,
    "reservedQuantity" DECIMAL(65,30) NOT NULL,
    "invoiceQuantity" DECIMAL(65,30) NOT NULL,
    "divergenceQuantity" DECIMAL(65,30),
    "currentBalance" DECIMAL(65,30) NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "divergenceReason" TEXT,
    "status" TEXT,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoices_number_key" ON "invoices"("number");

-- CreateIndex
CREATE INDEX "invoices_number_idx" ON "invoices"("number");

-- CreateIndex
CREATE INDEX "Stock_id_idx" ON "Stock"("id");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_createId_fkey" FOREIGN KEY ("createId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_stockTypeId_fkey" FOREIGN KEY ("stockTypeId") REFERENCES "stock_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_lastUpdatedBy_fkey" FOREIGN KEY ("lastUpdatedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
