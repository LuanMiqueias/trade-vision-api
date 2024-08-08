import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaWalletRepository } from "../../../repositories/prisma/wallet-user-repository";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { PrismaStocksRepository } from "@/repositories/prisma/prisma-stocks-repository";
import { PrismaPortfolioRepository } from "@/repositories/prisma/prisma-portfolio-repository";
import { SellStockUseCase } from "@/use-cases/trade/sell-stock";

export const sellStock = async (req: FastifyRequest, res: FastifyReply) => {
	const BodySchema = z.object({
		quantity: z.coerce.number().min(1),
		symbol: z.string(),
	});

	const stockRepository = new PrismaStocksRepository();
	const walletRepository = new PrismaWalletRepository();
	const portfolioRepository = new PrismaPortfolioRepository();

	const sellStockUseCase = new SellStockUseCase(
		stockRepository,
		walletRepository,
		portfolioRepository
	);
	const { quantity, symbol } = BodySchema.parse(req.body);

	try {
		const message = await sellStockUseCase.execute({
			userId: req?.user?.sub,
			quantity,
			symbol,
		});
		return res.status(200).send(message);
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return res.status(409).send({ message: err.message });
		} else {
			return res.status(500).send(); //TODO: fix later
		}
	}
};
