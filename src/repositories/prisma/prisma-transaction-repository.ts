import { prisma } from "../../lib/prisma";
import { Prisma, } from "@prisma/client";
import { TransactionRepository } from "../transaction.repository";

export class PrismaTransactionRepository implements TransactionRepository {
	async create(userId:string, data: Prisma.TransactionsUncheckedCreateInput){
		return  await prisma.transactions.create({
			data:{
				...data,
				userId,
			},
		})
	}
	getTransactionsByUserId(userId:string, filter: {page: number, skip: number, take: number}) {
		const transactions = prisma.transactions.findMany({
			skip: filter.page * filter.skip,
			take: filter.take,

			where:{
				userId
			}
		});

		return transactions
	}

}
