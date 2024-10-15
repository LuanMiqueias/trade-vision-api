-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_id_fkey";

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Crypto"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;
