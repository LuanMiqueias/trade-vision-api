import { Prisma, Stock } from "@prisma/client";
import { StocksRepository } from "../../repositories/stock.repository";
import { StockAlreadyExistsError } from "../errors/stock.already-exists-error";

interface CreateStockUseCaseRequest {
	symbol: string;
	name: string;
	price: number;
	sector: string;
	industry: string;
}

interface CreateStockUseCaseResponse {
	stocks: Stock[];
}

export class CreateStockUseCase {
	constructor(private stockRepository: StocksRepository) {}

	async execute(data: CreateStockUseCaseRequest[]) {
		await this.stockRepository.createMany(data);
	}
}
