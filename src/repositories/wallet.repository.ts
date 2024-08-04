import { Prisma, Wallet } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface WalletRepository {
	create(data: { userId: string; initialBalance: Decimal }): Promise<Wallet>;
	findByUserId(userId: string): Promise<Prisma.WalletWhereInput | null>;
	updateBalance(userId: string, newBalance: Decimal): Promise<Wallet>;
}
