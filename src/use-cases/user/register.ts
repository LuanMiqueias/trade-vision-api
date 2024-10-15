import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserRepository } from "../../repositories/user.repository";
import { UserAlreadyExistsError } from "../errors/user.already-exists-error";
import { WalletRepository } from "../../repositories/wallet.repository";
import { Decimal } from "@prisma/client/runtime/library";

interface CreateUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface CreateUserUseCaseResponse {
	user: User;
}

export class CreateUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private walletRepository: WalletRepository
	) {}

	async execute({
		name,
		email,
		password,
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		const passwordHash = await hash(password, 8);

		const userWithSameEmail = await this.userRepository.findByEmail(email);
		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const user = await this.userRepository.create({
			name,
			email,
			passwordHash,
		});
		try {
			await this.walletRepository.create({
				initialBalance: new Decimal(100), // TODO: Fix later
				userId: user?.id,
			});
		} catch (err) {
			throw new Error(err as string);
		}
		return {
			user: {
				...user,
			},
		};
	}
}
