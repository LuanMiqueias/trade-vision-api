import { FastifyReply, FastifyRequest } from "fastify";
import { GetHistoryStockUseCase } from "@/use-cases/stock/get-history-stock";
import { z } from "zod";

export const getHistoryStock = async (
	req: FastifyRequest,
	res: FastifyReply
) => {
	const ParamsSchema = z.object({
		symbol: z.string(),
	});
	const createStocksUseCase = new GetHistoryStockUseCase();
	const { symbol } = ParamsSchema.parse(req.params);

	try {
		const response = await createStocksUseCase.execute({ symbol });
		return res.status(200).send(response);
	} catch (err) {
		return res.status(500).send(err);
	}
};
