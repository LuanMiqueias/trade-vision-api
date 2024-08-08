import { User, Wallet } from "@prisma/client";

// Repository
import { WalletRepository } from "../../repositories/wallet.repository";

// Errors
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetWalletUseCaseRequest {
	userId: string;
}

interface GetWalletUseCaseResponse {
	wallet: Wallet;
}

export class GetWalletUseCase {
	constructor(private walletRepository: WalletRepository) {}

	async execute({
		userId,
	}: GetWalletUseCaseRequest): Promise<GetWalletUseCaseResponse> {
		const wallet = await this.walletRepository.findByUserId(userId);

		if (!wallet) throw new ResourceNotFoundError();

		return { wallet };
	}
}
