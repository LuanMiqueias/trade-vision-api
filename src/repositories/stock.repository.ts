import { Prisma, Stock } from "@prisma/client";

export interface StocksRepository {
	createMany(
		data: Prisma.StockCreateManyInput[]
	): Promise<Prisma.BatchPayload | undefined>;
	getStocks(page: number, skip: number, take: number): Promise<Stock[]>;
	findBySymbol(symbol: string): Promise<Stock | null>;
}
