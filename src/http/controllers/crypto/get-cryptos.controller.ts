import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCryptoRepository } from "@/repositories/prisma/crypto-repository";
import { GetCryptoUseCase } from "@/use-cases/crypto/get-cryptos";

export const getCryptos = async (req: FastifyRequest, res: FastifyReply) => {
	const QuerySchema = z.object({
		page: z.coerce.number().min(1).default(1),
		skip: z.coerce.number().min(0).default(0),
		take: z.coerce.number().min(1).default(5),
	});

	const repository = new PrismaCryptoRepository();
	const useCase = new GetCryptoUseCase(repository);
	const { page, skip, take } = QuerySchema.parse(req.query);
	try {
		const response = await useCase.execute({
			page,
			skip,
			take,
		});
		return res.status(200).send(response);
	} catch (err) {
		return res.status(500).send(err);
	}
};
