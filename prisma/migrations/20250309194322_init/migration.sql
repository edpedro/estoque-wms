-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'available',
    "capacity" DECIMAL(65,30) NOT NULL,
    "createId" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_addresses" (
    "itemId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30),

    CONSTRAINT "item_addresses_pkey" PRIMARY KEY ("itemId","addressId")
);

-- CreateIndex
CREATE INDEX "addresses_name_idx" ON "addresses"("name");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_createId_fkey" FOREIGN KEY ("createId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_addresses" ADD CONSTRAINT "item_addresses_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_addresses" ADD CONSTRAINT "item_addresses_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
