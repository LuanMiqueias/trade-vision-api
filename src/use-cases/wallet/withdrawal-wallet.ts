import { User, Wallet } from "@prisma/client";

// Repository
import { WalletRepository } from "../../repositories/wallet.repository";

// Errors
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Decimal } from "@prisma/client/runtime/library";

interface WithdrawalWalletUseCaseRequest {
	userId: string;
	newBalance: Decimal;
}

interface WithdrawalWalletUseCaseResponse {
	wallet: Wallet;
}

export class WithdrawalWalletUseCase {
	constructor(private walletRepository: WalletRepository) {}

	async execute({
		userId,
		newBalance,
	}: WithdrawalWalletUseCaseRequest): Promise<WithdrawalWalletUseCaseResponse> {
		const currentWallet = await this.walletRepository.findByUserId(userId);

		if (!currentWallet) throw new ResourceNotFoundError();

		const wallet = await this.walletRepository.updateBalance(
			userId,
			currentWallet.balance.minus(newBalance)
		);

		return { wallet };
	}
}
