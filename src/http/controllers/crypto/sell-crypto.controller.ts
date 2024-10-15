import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user.already-exists-error";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../../../use-cases/user/register";
import { PrismaWalletRepository } from "../../../repositories/prisma/prisma-wallet-user-repository";
import { PrismaCryptoRepository } from "@/repositories/prisma/prisma-crypto-repository";
import { CreateCryptoUseCase } from "@/use-cases/crypto/create-crypto";
import Decimal from "decimal.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { InsufficientBalanceError } from "@/use-cases/errors/insufficient-balance-error";
import { PrismaTransactionRepository } from "@/repositories/prisma/prisma-transaction-repository";
import { SellCryptoUseCase } from "@/use-cases/crypto/sell-crypto";

export const sellCrypto = async (req: FastifyRequest, res: FastifyReply) => {
	const createUserBodySchema = z.object({
		amount: z.number().transform((val) => new Decimal(val)),
		symbol: z.string(),
	});

	const walletRepository = new PrismaWalletRepository();
	const repositoryCrypto = new PrismaCryptoRepository();
	const repositoryTransaction = new PrismaTransactionRepository();
	const useCase = new SellCryptoUseCase(repositoryCrypto, walletRepository, repositoryTransaction);

	const { amount, symbol } = createUserBodySchema.parse(req.body);

	try {
		const data = await useCase.execute({
			amount,
			symbol,
			userId: req?.user?.sub,
		});
		return res.status(201).send(data);
	} catch (err) {
		if (
			err instanceof ResourceNotFoundError ||
			err instanceof InsufficientBalanceError
		) {
			return res.status(404).send({ message: err.message });
		} else {
			return res.status(500).send(err); //TODO: fix later
		}
	}
};
