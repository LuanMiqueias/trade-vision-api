import { WalletRepository } from "@/repositories/wallet.repository";
import { Crypto } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InsufficientBalanceError } from "../errors/insufficient-balance-error";
import Decimal from "decimal.js";
import { CryptoRepository } from "@/repositories/crypto.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";

interface SellCryptoUseCaseRequest {
	userId: string;
	symbol: string;
	amount: Decimal;
}

interface SellCryptoUseCaseResponse {
	amount: string;
	symbol: string;
	price: string;
}

export class SellCryptoUseCase {
	constructor(
		private cryptoRepository: CryptoRepository,
		private walletRepository: WalletRepository,
		private transactionRepository: TransactionRepository,
	) {}

	async execute({
		amount,
		symbol,
		userId,
	}: SellCryptoUseCaseRequest): Promise<SellCryptoUseCaseResponse> {
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
		if (!cryptoInWallet) throw new ResourceNotFoundError("cryptoInWallet");

		const transactionPrice = new Decimal(cryptoQuote || 0)
			.mul(amount)
			.toDecimalPlaces(2);
		const userBalance = new Decimal(userWallet?.balance || 0);

		// Check Balance
		const haveSufficientBalance = cryptoInWallet?.amount.gte(amount);
		if (!haveSufficientBalance) throw new InsufficientBalanceError();

		// Update or Create Portfolio
		await this.walletRepository.updateCryptoAmount(userWallet.id, {
			amount: new Decimal(cryptoInWallet?.amount)
				.minus(amount)
				.toDecimalPlaces(8),
			symbol,
		});

				// Update Balance
				const newBalance = userBalance.plus(transactionPrice).toDecimalPlaces(2);
				await this.walletRepository.updateBalance(userId, newBalance);

		await this.transactionRepository.create(userId, {
			userId,
			amount: new Decimal(amount.toFixed(8)),
			symbol,
			side:'SELL',
			price: transactionPrice.toFixed(2),
		})
		return {
			amount: amount.toFixed(8),
			symbol,
			price: transactionPrice.toFixed(2),
		};
	}
}
