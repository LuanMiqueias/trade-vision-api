import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../../lib/prisma";
import { WalletRepository } from "../wallet.repository";
import { Crypto, Prisma, Wallet } from "@prisma/client";
import { CryptoRepository } from "../crypto.repository";
import { StockAlreadyExistsError } from "@/use-cases/errors/stock.already-exists-error";
import { SymbolAlreadyExistsError } from "@/use-cases/errors/symbol-already-exists-error";

export class PrismaCryptoRepository implements CryptoRepository {
	async createMany(data: Prisma.CryptoCreateManyInput[]) {
		try {
			return await prisma.crypto.createMany({ data });
		} catch (err) {
			if (
				err instanceof Error &&
				err?.message?.includes(
					"Unique constraint failed on the fields: (`symbol`)"
				)
			)
				throw new SymbolAlreadyExistsError();
		}
	}
	async getCryptos(page: number, skip: number, take: number) {
		const data = await prisma.crypto.findMany({
			skip: page * skip,
			take,
			select: {
				name: true,
				symbol: true,
			},
		});

		return data;
	}
	async findBySymbol(symbol: string) {
		const data = await prisma.crypto.findUnique({
			where: {
				symbol,
			},
		});

		return data;
	}
}
