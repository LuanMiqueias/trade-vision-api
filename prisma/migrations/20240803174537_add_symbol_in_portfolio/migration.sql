/*
  Warnings:

  - You are about to drop the column `stockId` on the `Portfolio` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_stockId_fkey";

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "stockId",
ADD COLUMN     "symbol" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_symbol_fkey" FOREIGN KEY ("symbol") REFERENCES "Stock"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;
