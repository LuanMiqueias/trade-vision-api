import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCryptoRepository } from "@/repositories/prisma/prisma-crypto-repository";
import { GetCryptoUseCase } from "@/use-cases/crypto/get-cryptos";
import { GetTransactionsUseCase } from "@/use-cases/transaction/get-cryptos";
import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";

export const getCryptos = async (req: FastifyRequest, res: FastifyReply) => {
	const QuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
		skip: z.coerce.number().min(0).default(0),
		take: z.coerce.number().min(1).default(5),
	});

	const repository = new PrismaTransactionRepository();
	const useCase = new GetTransactionsUseCase(repository);
	const { page, skip, take } = QuerySchema.parse(req.query);
	try {
		const response = await useCase.execute({
			userId: req?.user?.sub,
			page,
			skip,
			take,
		});
		return res.status(200).send(response);
	} catch (err) {
		return res.status(500).send(err);
	}
};
