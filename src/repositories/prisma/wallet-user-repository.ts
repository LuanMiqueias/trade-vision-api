import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../../lib/prisma";
import { WalletRepository } from "../wallet.repository";
import { Prisma, Wallet } from "@prisma/client";

export class PrismaWalletRepository implements WalletRepository {
	async create(data: { userId: string; initialBalance: Decimal }) {
		const wallet = await prisma.wallet.create({
			data: {
				userId: data?.userId,
				balance: data?.initialBalance,
			},
		});

		return wallet;
	}
	async findByUserId(userId: string) {
		const wallet = await prisma.wallet.findUniqueOrThrow({
			where: {
				userId,
			},
			select: {
				id: true,
				balance: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return wallet;
	}

	async updateBalance(userId: string, newBalance: Decimal): Promise<Wallet> {
		const wallet = await prisma.wallet.update({
			data: {
				balance: newBalance,
			},
			where: {
				userId,
			},
		});

		return wallet;
	}
}
