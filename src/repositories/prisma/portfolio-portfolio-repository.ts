import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../../lib/prisma";
import { WalletRepository } from "../wallet.repository";
import { Portfolio, Prisma, Wallet } from "@prisma/client";
import { PortfolioRepository } from "../portfolio.repository";

export class PrismaPortfolioRepository implements PortfolioRepository {
	async create(data: Prisma.PortfolioUncheckedCreateInput) {
		const portfolio = await prisma.portfolio.create({
			data,
		});

		return portfolio;
	}
	async findManyByUserId(userId: string) {
		const portfolio = await prisma.portfolio.groupBy({
			by: ["symbol"],
			where: {
				userId,
			},
		});
		// .findMany({
		// 	where: {
		// 		userId,
		// 	},
		// 	select: {
		// 		id: true,
		// 		createdAt: true,
		// 		updatedAt: true,
		// 		quantity: true,
		// 		purchase_price: true,
		// 		symbol: true,
		// 	},
		// });

		return portfolio;
	}
	async remove(userId: string, portfolioId: string) {
		return await prisma.portfolio.delete({
			where: {
				userId,
				id: portfolioId,
			},
		});
	}

	async update(
		userId: string,
		portfolioId: string,
		data: Prisma.PortfolioUpdateWithoutUserInput
	): Promise<Portfolio> {
		const portfolio = await prisma.portfolio.update({
			data: data,
			where: {
				userId: userId,
				id: portfolioId,
			},
		});

		return portfolio;
	}
}
