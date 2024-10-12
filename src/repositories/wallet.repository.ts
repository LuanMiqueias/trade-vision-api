import { CryptoWallet, Prisma, Wallet } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface WalletRepository {
	create(data: { userId: string; initialBalance: Decimal }): Promise<Wallet>;
	findByUserId(userId: string): Promise<Wallet | null>;
	findDetailsByUserId(
		userId: string
	): Promise<Partial<
		{ cryptos: Partial<Crypto> & Partial<CryptoWallet>[] } & Wallet
	> | null>;
	findCryptoBySymbol(
		symbol: string,
		walletId: string
	): Promise<CryptoWallet | null>;
	updateBalance(userId: string, newBalance: Decimal): Promise<Wallet>;
	updateCryptoAmount(
		walletId: string,
		crypto: { amount: Decimal; symbol: string }
	): Promise<CryptoWallet>;
	addCrypto(
		walletId: string,
		crypto: Prisma.CryptoWalletUncheckedCreateInput
	): Promise<CryptoWallet | null>;
}
