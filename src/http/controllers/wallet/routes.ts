import { FastifyInstance } from "fastify";
import { getWallet } from "./get-wallet.controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { depositWallet } from "./deposit-wallet.controller";

// Controllers

export const walletRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJWT);

	app.get("/wallet", getWallet);
	app.post("/wallet/deposit", depositWallet);
};
