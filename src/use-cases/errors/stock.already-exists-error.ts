export class StockAlreadyExistsError extends Error {
	constructor() {
		super("Symbol already exits.");
	}
}
