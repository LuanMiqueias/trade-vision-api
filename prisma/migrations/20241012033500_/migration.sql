/*
  Warnings:

  - You are about to drop the column `userId` on the `CryptoWallet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CryptoWallet" DROP CONSTRAINT "CryptoWallet_userId_fkey";

-- AlterTable
ALTER TABLE "CryptoWallet" DROP COLUMN "userId";
