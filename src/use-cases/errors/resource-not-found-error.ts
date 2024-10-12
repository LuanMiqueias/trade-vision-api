export class ResourceNotFoundError extends Error {
	constructor(message?: string) {
		super(message ? `Resource not found - ${message}` : "Resource not found.");
	}
}
