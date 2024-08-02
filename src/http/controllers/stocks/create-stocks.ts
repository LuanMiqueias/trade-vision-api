import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaStocksRepository } from "../../../repositories/prisma/prisma-stocks-repository";
import { CreateStockUseCase } from "../../../use-cases/stock/create-many";
import { StockAlreadyExistsError } from "../../../use-cases/errors/stock.already-exists-error";

export const createStock = async (req: FastifyRequest, res: FastifyReply) => {
	const createBodySchema = z.array(
		z.object({
			symbol: z.string(),
			name: z.string(),
			price: z.number(),
			sector: z.string(),
			industry: z.string(),
		})
	);

	const repository = new PrismaStocksRepository();
	const createStocksUseCase = new CreateStockUseCase(repository);

	const dataArray = createBodySchema.parse(req.body);
	try {
		await createStocksUseCase.execute(dataArray);
		return res.status(201).send();
	} catch (err) {
		if (err instanceof StockAlreadyExistsError) {
			return res.status(409).send(err.message);
		}
		return res.status(500).send(err);
	}
};
