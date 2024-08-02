import { FastifyInstance } from "fastify";

// Controllers
import { createStock } from "./create-stocks";

export const stockRoutes = async (app: FastifyInstance) => {
	app.post("/stocks/create", createStock);
};
