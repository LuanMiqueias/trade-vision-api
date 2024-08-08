export class InsufficientBalanceError extends Error {
	constructor() {
		super("Insufficient balance");
	}
}
