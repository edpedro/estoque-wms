-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "userUpdateId" TEXT;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userUpdateId_fkey" FOREIGN KEY ("userUpdateId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
