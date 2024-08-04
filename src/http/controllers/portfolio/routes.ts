import { FastifyInstance } from "fastify";

// Controllers
import { createPortfolio } from "./create.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { getPortfolio } from "./get-portfolio.controller";

export const portfolioRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJWT);

	app.post("/portfolio/create", createPortfolio);
	app.get("/portfolio", getPortfolio);
};
