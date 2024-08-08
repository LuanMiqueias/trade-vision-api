import { FastifyReply, FastifyRequest } from "fastify";
import { GetQuoteStockUseCase } from "@/use-cases/stock/get-quote-stocks";

export const getQuoteStock = async (req: FastifyRequest, res: FastifyReply) => {
	const createStocksUseCase = new GetQuoteStockUseCase();
	try {
		const reponse = await createStocksUseCase.execute();
		return res.status(200).send(reponse);
	} catch (err) {
		return res.status(500).send(err);
	}
};
