import { WalletRepository } from "@/repositories/wallet.repository";
import { Crypto } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InsufficientBalanceError } from "../errors/insufficient-balance-error";
import Decimal from "decimal.js";
import { CryptoRepository } from "@/repositories/crypto.repository";

interface BuyCryptoUseCaseRequest {
	userId: string;
	symbol: string;
	amount: Decimal;
}

interface BuyCryptoUseCaseResponse {
	amount: string;
	symbol: string;
	price: string;
}

export class BuyCryptoUseCase {
	constructor(
		private cryptoRepository: CryptoRepository,
		private walletRepository: WalletRepository
	) {}

	async execute({
		amount,
		symbol,
		userId,
	}: BuyCryptoUseCaseRequest): Promise<BuyCryptoUseCaseResponse> {
		const userWallet = await this.walletRepository.findByUserId(userId);
		const crypto = await this.cryptoRepository.findBySymbol(symbol);

		const cryptoQuote = Math.random() * 100; // TODO: Fix later
		// Chech Crypto exists
		if (!crypto) throw new ResourceNotFoundError(symbol);

		// Check Wallet is created
		if (!userWallet) throw new ResourceNotFoundError("userWallet");

		const cryptoInWallet = await this.walletRepository.findCryptoBySymbol(
			symbol,
			userWallet.id
		);

		const transactionPrice = new Decimal(cryptoQuote || 0)
			.mul(amount)
			.toDecimalPlaces(2);
		const userBalance = new Decimal(userWallet?.balance || 0);

		// Check Balance
		const haveSufficientBalance = userBalance.gte(transactionPrice);
		if (!haveSufficientBalance) throw new InsufficientBalanceError();

		// Update Balance
		const newBalance = userBalance.minus(transactionPrice).toDecimalPlaces(2);
		await this.walletRepository.updateBalance(userId, newBalance);

		// Update or Create Portfolio
		if (!!cryptoInWallet?.id) {
			await this.walletRepository.updateCryptoAmount(userWallet.id, {
				amount: new Decimal(cryptoInWallet?.amount)
					.plus(amount)
					.toDecimalPlaces(8),
				symbol,
			});
		} else {
			await this.walletRepository.addCrypto(userWallet.id, {
				amount: new Decimal(amount.toFixed(8)),
				symbol,
			});
		}

		return {
			amount: amount.toFixed(8),
			symbol,
			price: transactionPrice.toFixed(2),
		};
	}
}
