import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

// Controllers
import { createCrypto } from "./create.controller";
import { getCryptos } from "./get-cryptos.controller";
import { buyCrypto } from "./buy-crypto.controller";
import { sellCrypto } from "./sell-crypto.controller";

export const cryptoRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJWT);

	app.post("/crypto/create", createCrypto);
	app.get("/crypto", getCryptos);
	app.post("/crypto/buy", buyCrypto);
	app.post("/crypto/sell", sellCrypto);
};
