import { FastifyReply, FastifyRequest } from "fastify";

export const verifyJWT = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		await req.jwtVerify();
	} catch (err) {
		return res.status(401).send({ message: "Unauthorized" });
	}
};
