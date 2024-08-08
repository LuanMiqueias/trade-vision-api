import { StocksRepository } from "@/repositories/stock.repository";
import { Stock } from "@prisma/client";

interface GetStockUseCaseRequest {
	page: number;
	skip: number;
	take: number;
}

interface GetStockUseCaseResponse {
	stocks: Stock[];
}

export class GetStockUseCase {
	constructor(private stockRepository: StocksRepository) {}

	async execute({
		page,
		skip,
		take,
	}: GetStockUseCaseRequest): Promise<GetStockUseCaseResponse> {
		const stocks = await this.stockRepository.getStocks(page, skip, take);
		return { stocks };
	}
}
