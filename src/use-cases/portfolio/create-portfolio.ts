import { Portfolio, Stock } from "@prisma/client";
import { StocksRepository } from "../../repositories/stock.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { PortfolioRepository } from "../../repositories/portfolio.repository";
import { SymbolNotFoundError } from "../errors/symbol-not-found-error";

interface CreatePortfolioUseCaseRequest {
	quantity: number;
	purchase_price: Decimal;
	userId: string;
	symbol: string;
}

interface CreatePortfolioUseCaseResponse {
	portfolio: Portfolio;
}

export class CreatePortfolioUseCase {
	constructor(
		private porfolioRepository: PortfolioRepository,
		private stocksRepository: StocksRepository
	) {}

	async execute(
		data: CreatePortfolioUseCaseRequest
	): Promise<CreatePortfolioUseCaseResponse> {
		const symbolExists = await this.stocksRepository.findBySymbol(data.symbol);

		if (!symbolExists) throw new SymbolNotFoundError();

		const portfolio = await this.porfolioRepository.create(data);

		return { portfolio };
	}
}
