import axios from "axios";
import { env } from "@/env";

interface GetHistoryStockUseCaseRequest {
	symbol: string;
}

interface GetHistoryStockUseCaseResponse {}

export class GetHistoryStockUseCase {
	async execute({ symbol }: GetHistoryStockUseCaseRequest) {
		const { data } = await axios.get(
			`${env.ALPHA_VANTAG_URL}query?function=HISTORICAL_OPTIONS`,
			{
				params: {
					symbol,
					apikey: env.FINANCIAL_MODELING_PREP_API_KEY,
				},
			}
		);
		return await data;
	}
}
