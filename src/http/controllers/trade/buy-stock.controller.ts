import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user.already-exists-error";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../../../use-cases/user/register";
import { PrismaWalletRepository } from "../../../repositories/prisma/wallet-user-repository";
import { GetWalletUseCase } from "../../../use-cases/wallet/get-wallet";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { BuyStockUseCase } from "@/use-cases/trade/buy-stock";
import { PrismaStocksRepository } from "@/repositories/prisma/prisma-stocks-repository";
import { PrismaPortfolioRepository } from "@/repositories/prisma/prisma-portfolio-repository";
import { InsufficientBalanceError } from "@/use-cases/errors/insufficient-balance-error";

export const buyStock = async (req: FastifyRequest, res: FastifyReply) => {
	const BodySchema = z.object({
		quantity: z.coerce.number().min(1),
		symbol: z.string(),
	});

	const stockRepository = new PrismaStocksRepository();
	const walletRepository = new PrismaWalletRepository();
	const portfolioRepository = new PrismaPortfolioRepository();

	const buyStockUseCase = new BuyStockUseCase(
		stockRepository,
		walletRepository,
		portfolioRepository
	);
	const { quantity, symbol } = BodySchema.parse(req.body);

	try {
		const message = await buyStockUseCase.execute({
			userId: req?.user?.sub,
			quantity,
			symbol,
		});
		return res.status(200).send(message);
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return res.status(409).send({ message: err.message });
		} else if (err instanceof InsufficientBalanceError) {
			return res.status(400).send({ message: err.message });
		} else {
			return res.status(500).send(); //TODO: fix later
		}
	}
};
