import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

// Controllers
import { getCryptos } from "./get-statement.controller";

export const statementRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJWT);

	app.get("/statement", getCryptos);
};
