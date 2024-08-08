import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user.already-exists-error";
import { CreatePortfolioUseCase } from "@/use-cases/portfolio/create-portfolio";
import { PrismaPortfolioRepository } from "@/repositories/prisma/prisma-portfolio-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { PrismaStocksRepository } from "@/repositories/prisma/prisma-stocks-repository";
import { SymbolNotFoundError } from "@/use-cases/errors/symbol-not-found-error";

export const createPortfolio = async (
	req: FastifyRequest,
	res: FastifyReply
) => {
	const PortfolioUserBodySchema = z.object({
		quantity: z
			.number()
			.min(1)
			.refine((v) => {
				const decimal = new Decimal(v);
				return decimal.decimalPlaces() === 0;
			}),
		purchase_price: z
			.number()
			.min(0.1)
			.refine((v) => {
				const decimal = new Decimal(v);
				return decimal.decimalPlaces() <= 2;
			}),
		symbol: z.string(),
	});

	const repository = new PrismaPortfolioRepository();
	const stockRepository = new PrismaStocksRepository();
	const portfolioUseCase = new CreatePortfolioUseCase(
		repository,
		stockRepository
	);

	const { purchase_price, quantity, symbol } = PortfolioUserBodySchema.parse(
		req.body
	);

	try {
		await portfolioUseCase.execute({
			purchase_price: new Decimal(purchase_price),
			quantity,
			symbol,
			userId: req.user.sub,
		});
		return res.status(201).send();
	} catch (err) {
		if (err instanceof SymbolNotFoundError)
			return res.status(404).send(err.message);
		else return res.status(500).send(); //TODO: fix later
	}
};
