import { CryptoRepository } from "@/repositories/crypto.repository";
import { Crypto } from "@prisma/client";

interface GetCryptoUseCaseRequest {
	page: number;
	skip: number;
	take: number;
}

interface GetCryptoUseCaseResponse {
	cryptos: Partial<Crypto>[];
}

export class GetCryptoUseCase {
	constructor(private repository: CryptoRepository) {}

	async execute({
		page,
		skip,
		take,
	}: GetCryptoUseCaseRequest): Promise<GetCryptoUseCaseResponse> {
		const cryptos = await this.repository.getCryptos(page, skip, take);
		return { cryptos };
	}
}
