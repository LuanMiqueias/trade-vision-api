import { Portfolio } from "@prisma/client";
import { PortfolioRepository } from "../../repositories/portfolio.repository";

interface RemovePortfolioUseCaseRequest {
	userId: string;
	portfolioId: string;
}

interface RemovePortfolioUseCaseResponse {
	portfolio: Portfolio;
}

export class RemovePortfolioUseCase {
	constructor(private porfolioRepository: PortfolioRepository) {}

	async execute({
		userId,
		portfolioId,
	}: RemovePortfolioUseCaseRequest): Promise<RemovePortfolioUseCaseResponse> {
		const portfolio = await this.porfolioRepository.remove(userId, portfolioId);

		return { portfolio };
	}
}
