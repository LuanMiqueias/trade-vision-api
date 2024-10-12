/*
  Warnings:

  - You are about to drop the column `walletId` on the `CryptoWallet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CryptoWallet" DROP CONSTRAINT "CryptoWallet_walletId_fkey";

-- DropIndex
DROP INDEX "CryptoWallet_walletId_key";

-- AlterTable
ALTER TABLE "CryptoWallet" DROP COLUMN "walletId";

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_id_fkey" FOREIGN KEY ("id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
