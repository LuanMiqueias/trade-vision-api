import { Prisma, Crypto, Transactions } from "@prisma/client";

export interface TransactionRepository {
	create(
		userId:string,
		data: Prisma.TransactionsUncheckedCreateInput
	): Promise<Transactions>;
	getTransactionsByUserId(
		userId:string, 
		filter: {page: number, skip: number, take: number}
	): Promise<Transactions[]>;
}
