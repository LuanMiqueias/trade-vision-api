import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserRepository } from "../../repositories/user.repository";
import { UserAlreadyExistsError } from "../errors/user.already-exists-error";

interface CreateUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface CreateUserUseCaseResponse {
	user: User;
}

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

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
		return { user };
	}
}
