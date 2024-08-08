import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPortfolioRepository } from "@/repositories/prisma/prisma-portfolio-repository";
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
