import { StocksRepository } from "../../repositories/stock.repository";
import { env } from "@/env";
import axios from "axios";
import { Decimal } from "@prisma/client/runtime/library";

interface CreateStockUseCaseRequest {
	symbol: string;
	name: string;
	price: number;
	sector: string;
	industry: string;
	shortName: string;
}
interface responseProvider {
	symbol: string;
	name: string;
	price: number;
	exchange: string;
	exchangeShortName: string;
	type: string;
}

export class CreateStockUseCase {
	constructor(private stockRepository: StocksRepository) {}

	async execute() {
		const { data, status } = await axios.get<responseProvider[]>(
			`${env.FINANCIAL_MODELING_PREP_URL}/api/v3/stock/list`,
			{
				params: {
					apikey: env.FINANCIAL_MODELING_PREP_API_KEY,
				},
			}
		);

		if (status !== 200) throw new Error("provider error");

		const transformDataToCreateStocks: CreateStockUseCaseRequest[] = data
			.slice(0, 200)
			.map((item) => {
				return {
					symbol: item?.symbol,
					name: item?.name,
					price: Number(
						new Decimal(item?.price).toDecimalPlaces(2, Decimal.ROUND_DOWN)
					),
					sector: item?.type,
					industry: item?.exchange,
					shortName: item?.exchangeShortName,
				};
			});

		await this.stockRepository.createMany(transformDataToCreateStocks);
	}
}
