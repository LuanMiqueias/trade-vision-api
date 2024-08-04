import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

// Repository
import { StocksRepository } from "../stock.repository";
import { StockAlreadyExistsError } from "../../use-cases/errors/stock.already-exists-error";

export class PrismaStocksRepository implements StocksRepository {
	async createMany(data: Prisma.StockCreateManyInput[]) {
		try {
			return await prisma.stock.createMany({ data });
		} catch (err) {
			if (
				err instanceof Error &&
				err?.message?.includes(
					"Unique constraint failed on the fields: (`symbol`)"
				)
			)
				throw new StockAlreadyExistsError();
		}
	}
	async getStocks() {
		const data = await prisma.stock.findMany();

		return data;
	}
	async findBySymbol(symbol: string) {
		const data = await prisma.stock.findUnique({
			where: {
				symbol,
			},
		});

		return data;
	}
}
