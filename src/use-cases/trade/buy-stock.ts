// import { StocksRepository } from "@/repositories/stock.repository";
// import { WalletRepository } from "@/repositories/wallet.repository";
// import { Stock } from "@prisma/client";
// import { ResourceNotFoundError } from "../errors/resource-not-found-error";
// import { InsufficientBalanceError } from "../errors/insufficient-balance-error";
// import Decimal from "decimal.js";
// import { PortfolioRepository } from "@/repositories/portfolio.repository";

// interface BuyStockUseCaseRequest {
// 	userId: string;
// 	symbol: string;
// 	quantity: number;
// }

// interface BuyStockUseCaseResponse {
// 	message: string;
// }

// export class BuyStockUseCase {
// 	constructor(
// 		private stockRepository: StocksRepository,
// 		private walletRepository: WalletRepository,
// 		private portfolioRepository: PortfolioRepository
// 	) {}

// 	async execute({
// 		quantity,
// 		symbol,
// 		userId,
// 	}: BuyStockUseCaseRequest): Promise<BuyStockUseCaseResponse> {
// 		const userWallet = await this.walletRepository.findByUserId(userId);
// 		const userPortfolio = await this.portfolioRepository.findBySymbol(
// 			userId,
// 			symbol
// 		);
// 		const stock = await this.stockRepository.findBySymbol(symbol);

// 		// Chech Stock exists
// 		if (!stock) throw new ResourceNotFoundError();

// 		const stockPrice = new Decimal(stock?.price || 0).mul(quantity);
// 		const userBalance = new Decimal(userWallet?.balance || 0);
// 		console.log(userBalance.gte(stockPrice));
// 		// Check Balance
// 		const haveSufficientBalance = userBalance.gte(stockPrice);
// 		if (!haveSufficientBalance) throw new InsufficientBalanceError();

// 		// Update Balance
// 		const newBalance = userBalance.minus(stockPrice);
// 		await this.walletRepository.updateBalance(userId, newBalance);

// 		// Update or Create Portfolio
// 		if (userPortfolio) {
// 			await this.portfolioRepository.update(userId, userPortfolio.id, {
// 				quantity: quantity + userPortfolio?.quantity,
// 				purchase_price: stockPrice,
// 			});
// 		} else {
// 			await this.portfolioRepository.create({
// 				userId,
// 				quantity,
// 				purchase_price: stockPrice,
// 				symbol: stock.symbol,
// 			});
// 		}

// 		return { message: "sucess" };
// 	}
// }
