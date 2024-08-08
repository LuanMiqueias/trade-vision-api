import { Portfolio } from "@prisma/client";
import { PortfolioRepository } from "../../repositories/portfolio.repository";

interface GetAllPortfolioUseCaseRequest {
	userId: string;
}

interface GetAllPortfolioUseCaseResponse {
	portfolios: Portfolio[] | null;
}

export class GetAllPortfolioUseCase {
	constructor(private porfolioRepository: PortfolioRepository) {}

	async execute({
		userId,
	}: GetAllPortfolioUseCaseRequest): Promise<GetAllPortfolioUseCaseResponse> {
		const portfolios = await this.porfolioRepository.findManyByUserId(userId);

		return { portfolios };
	}
}
