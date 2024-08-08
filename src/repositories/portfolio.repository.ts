import { Portfolio, Prisma } from "@prisma/client";

export interface PortfolioRepository {
	create(data: Prisma.PortfolioUncheckedCreateInput): Promise<Portfolio>;
	findManyByUserId(
		userId: string
	): Promise<Prisma.PortfolioWhereInput[] | null>;
	findBySymbol(userId: string, symbol: string): Promise<Portfolio | null>;
	remove(userId: string, portfolioId: string): Promise<Portfolio>;
	update(
		userId: string,
		portfolioId: string,
		data: Prisma.PortfolioUpdateWithoutUserInput
	): Promise<Portfolio>;
}
