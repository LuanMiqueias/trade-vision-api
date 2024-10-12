import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../../lib/prisma";
import { WalletRepository } from "../wallet.repository";
import { CryptoWallet, Prisma, Wallet } from "@prisma/client";

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
		const wallet = await prisma.wallet.findUnique({
			where: {
				userId,
			},
		});

		return wallet;
	}

	async findDetailsByUserId(userId: string) {
		const wallet = await prisma.wallet.findUnique({
			where: {
				userId,
			},
			select: {
				userId: false,
				balance: true,
				id: true,
				createdAt: true,
				updatedAt: true,
				cryptos: {
					select: {
						amount: true,
						crypto: {
							select: {
								name: true,
								symbol: true,
							},
						},
					},
				},
			},
		});

		return wallet;
	}
	async findCryptoBySymbol(symbol: string, walletId: string) {
		const cryptoWallet = await prisma.cryptoWallet.findUnique({
			where: {
				walletId_symbol: {
					walletId,
					symbol,
				},
			},
		});

		return cryptoWallet;
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
	async updateCryptoAmount(
		walletId: string,
		crypto: { amount: Decimal; symbol: string }
	): Promise<CryptoWallet> {
		console.log("cryptoWallet");
		const cryptoWallet = await prisma.cryptoWallet.update({
			data: {
				amount: crypto?.amount,
			},
			where: {
				walletId_symbol: {
					walletId,
					symbol: crypto?.symbol,
				},
			},
		});
		return cryptoWallet;
	}

	async addCrypto(
		walletId: string,
		crypto: CryptoWallet
	): Promise<CryptoWallet> {
		const cryptoWallet = await prisma.cryptoWallet.create({
			data: {
				...crypto,
				walletId,
			},
		});

		return cryptoWallet;
	}
}
