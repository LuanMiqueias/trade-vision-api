import { Prisma, Stock } from "@prisma/client";
import { StocksRepository } from "../../repositories/stock.repository";
import { StockAlreadyExistsError } from "../errors/stock.already-exists-error";
import axios from "axios";
import { env } from "@/env";

export class GetQuoteStockUseCase {
	async execute() {
		const { data } = await axios.get(
			`${env.FINANCIAL_MODELING_PREP_URL}/api/v3/stock/full/real-time-price`,
			{
				params: {
					apikey: env.FINANCIAL_MODELING_PREP_API_KEY,
				},
			}
		);
		return await data;
	}
}
