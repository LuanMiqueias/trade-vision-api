import { StocksRepository } from "@/repositories/stock.repository";
import { WalletRepository } from "@/repositories/wallet.repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InsufficienQuantityeError } from "../errors/insufficient-quantity-error";
import Decimal from "decimal.js";
import { PortfolioRepository } from "@/repositories/portfolio.repository";

interface SellStockUseCaseRequest {
	userId: string;
	symbol: string;
	quantity: number;
}

interface SellStockUseCaseResponse {
	message: string;
}

export class SellStockUseCase {
	constructor(
		private stockRepository: StocksRepository,
		private walletRepository: WalletRepository,
		private portfolioRepository: PortfolioRepository
	) {}

	async execute({
		quantity,
		symbol,
		userId,
	}: SellStockUseCaseRequest): Promise<SellStockUseCaseResponse> {
		const userWallet = await this.walletRepository.findByUserId(userId);
		const stock = await this.stockRepository.findBySymbol(symbol);
		const portfolio = await this.portfolioRepository.findBySymbol(
			userId,
			symbol
		);

		// Chech Stock exists
		if (!stock || !portfolio) throw new ResourceNotFoundError();
		const userBalance = new Decimal(userWallet?.balance || 0);

		const stockPrice = new Decimal(stock?.price || 0);

		// Check Balance
		const haveSufficientQuantity = portfolio.quantity > 0;
		if (!haveSufficientQuantity) throw new InsufficienQuantityeError();

		// Update Balance
		const newBalance = userBalance.plus(stockPrice.mul(portfolio.quantity));
		await this.walletRepository.updateBalance(userId, newBalance);

		// Update Portfolio
		await this.portfolioRepository.remove(userId, portfolio.id);

		return { message: "sucess" };
	}
}
