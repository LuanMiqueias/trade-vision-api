import { Prisma, Stock } from "@prisma/client";

export interface StocksRepository {
	createMany(data: Prisma.StockCreateManyInput[]);
	getStocks(): Promise<Stock[]>;
}
