-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "cancellationReason" TEXT,
ADD COLUMN     "isInvoiceCancelled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userCancelledId" TEXT;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userCancelledId_fkey" FOREIGN KEY ("userCancelledId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
