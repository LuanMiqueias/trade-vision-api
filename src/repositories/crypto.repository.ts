import { Prisma, Crypto } from "@prisma/client";

export interface CryptoRepository {
	createMany(
		data: Prisma.CryptoCreateManyInput[]
	): Promise<Prisma.BatchPayload | undefined>;
	getCryptos(
		page: number,
		skip: number,
		take: number
	): Promise<Partial<Crypto>[]>;
	findBySymbol(symbol: string): Promise<Crypto | null>;
}
