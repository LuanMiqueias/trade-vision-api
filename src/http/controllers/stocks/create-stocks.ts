import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaStocksRepository } from "../../../repositories/prisma/prisma-stocks-repository";
import { CreateStockUseCase } from "../../../use-cases/stock/create-or-update-stocks";
import { StockAlreadyExistsError } from "../../../use-cases/errors/stock.already-exists-error";

export const createStock = async (req: FastifyRequest, res: FastifyReply) => {
	const repository = new PrismaStocksRepository();
	const createStocksUseCase = new CreateStockUseCase(repository);

	try {
		await createStocksUseCase.execute();
		return res.status(201).send();
	} catch (err) {
		if (err instanceof StockAlreadyExistsError) {
			return res.status(409).send(err.message);
		}
		return res.status(500).send(err);
	}
};
