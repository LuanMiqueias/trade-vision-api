// Repository
import { CryptoRepository } from "@/repositories/crypto.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { $Enums } from "@prisma/client";
import Decimal from "decimal.js";

interface UseCaseRequest {
  symbol: string
  userId: string
  amount: Decimal
  side: $Enums.TransactionSide
  price: Decimal
}
export class CreateTransactionUseCase {
	constructor(private repository: TransactionRepository) {}

	async execute(data: UseCaseRequest) {
		await this.repository.create(data?.userId, data);
	}
}
