import { FastifyInstance } from "fastify";
import { createUser } from "./create.controller";
import { authenticate } from "./authenticate.controller";

// Controllers

export const userRoutes = async (app: FastifyInstance) => {
	app.post("/auth/register", createUser);
	app.post("/auth/login", authenticate);
};
