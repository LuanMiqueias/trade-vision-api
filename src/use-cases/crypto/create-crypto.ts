// Repository
import { CryptoRepository } from "@/repositories/crypto.repository";

interface CreateCryptoUseCaseRequest {
	cryptos: {
		symbol: string;
		name: string;
	}[];
}
export class CreateCryptoUseCase {
	constructor(private cryptoRepository: CryptoRepository) {}

	async execute(data: CreateCryptoUseCaseRequest) {
		await this.cryptoRepository.createMany(data?.cryptos);
	}
}
