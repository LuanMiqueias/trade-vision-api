import { FastifyInstance } from "fastify";

// Controllers
import { createStock } from "./create-stocks";

// Middlewares
import { verifyJWT } from "../../middlewares/verify-jwt";

export const stockRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJWT);

	app.post("/stocks/create", createStock);
};
