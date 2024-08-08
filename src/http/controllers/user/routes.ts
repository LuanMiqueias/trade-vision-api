import { FastifyInstance } from "fastify";

// Controllers
import { createUser } from "./create.controller";
import { authenticate } from "./authenticate.controller";

export const userRoutes = async (app: FastifyInstance) => {
	app.post("/auth/register", createUser);
	app.post("/auth/login", authenticate);
};
