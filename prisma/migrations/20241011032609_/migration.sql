/*
  Warnings:

  - You are about to drop the column `userId` on the `CryptoWallet` table. All the data in the column will be lost.
  - You are about to drop the column `walletId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[symbol]` on the table `CryptoWallet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[walletId]` on the table `CryptoWallet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CryptoWallet" DROP CONSTRAINT "CryptoWallet_id_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_walletId_fkey";

-- AlterTable
ALTER TABLE "CryptoWallet" DROP COLUMN "userId",
ADD COLUMN     "symbol" TEXT;

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "walletId";

-- CreateIndex
CREATE UNIQUE INDEX "CryptoWallet_symbol_key" ON "CryptoWallet"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "CryptoWallet_walletId_key" ON "CryptoWallet"("walletId");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_userId_key" ON "Transactions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Crypto"("symbol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
