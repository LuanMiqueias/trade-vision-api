import { FastifyInstance } from "fastify";
import { buyStock } from "./buy-stock.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { sellStock } from "./sell-stock.controller";

// Controllers

export const tradeRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJWT);

	app.post("/trade/buy", buyStock);
	app.post("/trade/sell", sellStock);
};
