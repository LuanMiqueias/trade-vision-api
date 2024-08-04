import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user.already-exists-error";
import { CreatePortfolioUseCase } from "@/use-cases/portfolio/create-portfolio";
import { PrismaPortfolioRepository } from "@/repositories/prisma/portfolio-portfolio-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { GetAllPortfolioUseCase } from "@/use-cases/portfolio/get-all-portfolio";

export const getPortfolio = async (req: FastifyRequest, res: FastifyReply) => {
	const repository = new PrismaPortfolioRepository();
	const portfolioUseCase = new GetAllPortfolioUseCase(repository);

	try {
		const portfolio = await portfolioUseCase.execute({
			userId: req.user.sub,
		});
		return res.status(200).send(portfolio);
	} catch (err) {
		return res.status(500).send(); //TODO: fix later
	}
};
