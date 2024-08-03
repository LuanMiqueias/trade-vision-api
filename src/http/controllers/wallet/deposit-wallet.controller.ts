import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaWalletRepository } from "../../../repositories/prisma/wallet-user-repository";
import { DepositWalletUseCase } from "../../../use-cases/wallet/deposit-wallet";
import { Decimal } from "@prisma/client/runtime/library";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { MaxTwoDecimalError } from "../../../use-cases/errors/max-two-decimal-error";

export const depositWallet = async (req: FastifyRequest, res: FastifyReply) => {
	const createBodySchema = z.object({
		amount: z.number(),
		// .refine((v) => {
		// 	const decimal = new Decimal(v);
		// 	return decimal.decimalPlaces() <= 2;
		// }),
	});

	const repository = new PrismaWalletRepository();
	const useCase = new DepositWalletUseCase(repository);

	const { amount } = createBodySchema.parse(req.body);

	try {
		const wallet = await useCase.execute({
			userId: req?.user?.sub,
			newBalance: new Decimal(amount),
		});
		return res.status(200).send(wallet);
	} catch (err) {
		if (
			err instanceof ResourceNotFoundError ||
			err instanceof MaxTwoDecimalError
		) {
			return res.status(409).send({ message: err.message });
		} else {
			return res.status(500).send(); //TODO: fix later
		}
	}
};
