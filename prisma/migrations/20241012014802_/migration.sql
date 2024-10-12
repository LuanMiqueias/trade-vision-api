-- DropForeignKey
ALTER TABLE "CryptoWallet" DROP CONSTRAINT "CryptoWallet_walletId_fkey";

-- AlterTable
ALTER TABLE "CryptoWallet" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "CryptoWallet" ADD CONSTRAINT "CryptoWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
