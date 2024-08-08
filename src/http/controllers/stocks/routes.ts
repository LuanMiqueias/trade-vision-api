import { FastifyInstance } from "fastify";

// Controllers
import { createStock } from "./create-stocks";

// Middlewares
import { verifyJWT } from "../../middlewares/verify-jwt";
import { getQuoteStock } from "./quote-stocks";
import { getStocks } from "./get-stocks";
import { getHistoryStock } from "./history-stocks";

export const stockRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJWT);

	app.post("/stocks/create", createStock);
	app.get("/stocks", getStocks);
	app.get("/stocks/quote", getQuoteStock);
	app.get("/stocks/:symbol/history", getHistoryStock);
};
