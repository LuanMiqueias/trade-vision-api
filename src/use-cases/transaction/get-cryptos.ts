import { CryptoRepository } from "@/repositories/crypto.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { Crypto, Transactions } from "@prisma/client";

interface UseCaseRequest {
	userId:string;
	page: number;
	skip: number;
	take: number;
}

interface UseCaseResponse {
	transactions: Transactions[];
}

export class GetTransactionsUseCase {
	constructor(private repository: TransactionRepository) {}

	async execute({
		userId,
		page,
		skip,
		take,
	}: UseCaseRequest): Promise<UseCaseResponse> {
		const transactions = await this.repository.getTransactionsByUserId(userId, {page, skip, take});
		return { transactions };
	}
}
