export class SymbolAlreadyExistsError extends Error {
	constructor() {
		super("Symbol already exits.");
	}
}
