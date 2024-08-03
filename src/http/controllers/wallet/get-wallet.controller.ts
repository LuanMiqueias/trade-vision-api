import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user.already-exists-error";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../../../use-cases/user/register";
import { PrismaWalletRepository } from "../../../repositories/prisma/wallet-user-repository";
import { GetWalletUseCase } from "../../../use-cases/wallet/get-wallet";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export const getWallet = async (req: FastifyRequest, res: FastifyReply) => {
	const repository = new PrismaWalletRepository();
	const createUserUseCase = new GetWalletUseCase(repository);

	try {
		const wallet = await createUserUseCase.execute({
			userId: req?.user?.sub,
		});
		return res.status(200).send(wallet);
	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return res.status(409).send({ message: err.message });
		} else {
			return res.status(500).send(); //TODO: fix later
		}
	}
};
