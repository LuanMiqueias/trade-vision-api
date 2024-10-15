import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user.already-exists-error";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../../../use-cases/user/register";
import { PrismaWalletRepository } from "../../../repositories/prisma/prisma-wallet-user-repository";
import { PrismaCryptoRepository } from "@/repositories/prisma/prisma-crypto-repository";
import { CreateCryptoUseCase } from "@/use-cases/crypto/create-crypto";

export const createCrypto = async (req: FastifyRequest, res: FastifyReply) => {
	const createUserBodySchema = z.object({
		cryptos: z.array(
			z.object({
				symbol: z.string(),
				name: z.string(),
			})
		),
	});

	const repository = new PrismaCryptoRepository();
	const useCase = new CreateCryptoUseCase(repository);

	const { cryptos } = createUserBodySchema.parse(req.body);

	try {
		await useCase.execute({ cryptos });
		return res.status(201).send();
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return res.status(409).send({ message: err.message });
		} else {
			return res.status(500).send(); //TODO: fix later
		}
	}
};
