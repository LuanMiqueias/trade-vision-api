import { Portfolio } from "@prisma/client";
import { PortfolioRepository } from "../../repositories/portfolio.repository";

interface UpdatePortfolioUseCaseRequest {
	userId: string;
	portfolioId: string;

	data: {
		createdAt: Date;
		updatedAt: Date;
		quantity: number;
		stockId: string;
	};
}

interface UpdatePortfolioUseCaseResponse {
	portfolio: Portfolio;
}

export class UpdatePortfolioUseCase {
	constructor(private porfolioRepository: PortfolioRepository) {}

	async execute({
		userId,
		portfolioId,
		data,
	}: UpdatePortfolioUseCaseRequest): Promise<UpdatePortfolioUseCaseResponse> {
		const portfolio = await this.porfolioRepository.update(
			userId,
			portfolioId,
			data
		);

		return { portfolio };
	}
}
