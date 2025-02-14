-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "companyId" INTEGER,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" DECIMAL(65,30),
    "weight" DECIMAL(65,30),
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "create_id" TEXT NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_code_key" ON "item"("code");

-- CreateIndex
CREATE INDEX "item_code_idx" ON "item"("code");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_create_id_fkey" FOREIGN KEY ("create_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
