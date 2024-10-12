/*
  Warnings:

  - A unique constraint covering the columns `[walletId,symbol]` on the table `CryptoWallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CryptoWallet_walletId_symbol_key" ON "CryptoWallet"("walletId", "symbol");
