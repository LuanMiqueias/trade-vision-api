import { FastifyReply, FastifyRequest } from "fastify";
import { GetStockUseCase } from "@/use-cases/stock/get-stocks";
import { PrismaStocksRepository } from "@/repositories/prisma/prisma-stocks-repository";
import { z } from "zod";

export const getStocks = async (req: FastifyRequest, res: FastifyReply) => {
	const QuerySchema = z.object({
		page: z.coerce.number().min(1),
		skip: z.coerce.number().min(0),
		take: z.coerce.number().min(1),
	});

	const repository = new PrismaStocksRepository();
	const createStocksUseCase = new GetStockUseCase(repository);
	const { page, skip, take } = QuerySchema.parse(req.query);
	try {
		const response = await createStocksUseCase.execute({
			page,
			skip,
			take,
		});
		return res.status(200).send(response);
	} catch (err) {
		return res.status(500).send(err);
	}
};
