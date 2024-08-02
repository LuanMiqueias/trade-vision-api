import { FastifyInstance } from "fastify";

// Controllers
import { getUser } from "./get-user";

export const userRoutes = async (app: FastifyInstance) => {
	app.get("/user", getUser);
};
