/*
  Warnings:

  - Added the required column `symbol` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transactions_userId_key";

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "symbol" TEXT NOT NULL;
