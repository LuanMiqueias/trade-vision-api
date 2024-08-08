import { User, Wallet } from "@prisma/client";

// Repository
import { WalletRepository } from "../../repositories/wallet.repository";

// Errors
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxTwoDecimalError } from "../errors/max-two-decimal-error";

interface DepositWalletUseCaseRequest {
	userId: string;
	newBalance: Decimal;
}

interface DepositWalletUseCaseResponse {
	wallet: Wallet;
}

export class DepositWalletUseCase {
	constructor(private walletRepository: WalletRepository) {}

	async execute({
		userId,
		newBalance,
	}: DepositWalletUseCaseRequest): Promise<DepositWalletUseCaseResponse> {
		const newBalanceIsValid = newBalance.decimalPlaces() <= 2;

		if (!newBalanceIsValid) throw new MaxTwoDecimalError();
		const currentWallet = await this.walletRepository.findByUserId(userId);

		if (!currentWallet) throw new ResourceNotFoundError();

		const wallet = await this.walletRepository.updateBalance(
			userId,
			currentWallet.balance.plus(newBalance)
		);

		return { wallet };
	}
}
