/*
  Warnings:

  - Added the required column `walletId` to the `CryptoWallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CryptoWallet" DROP CONSTRAINT "CryptoWallet_id_fkey";

-- AlterTable
ALTER TABLE "CryptoWallet" ADD COLUMN     "walletId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
