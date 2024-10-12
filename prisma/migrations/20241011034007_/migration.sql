/*
  Warnings:

  - Made the column `symbol` on table `CryptoWallet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CryptoWallet" DROP CONSTRAINT "CryptoWallet_symbol_fkey";

-- DropIndex
DROP INDEX "CryptoWallet_symbol_key";

-- AlterTable
ALTER TABLE "CryptoWallet" ALTER COLUMN "symbol" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Crypto"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;
