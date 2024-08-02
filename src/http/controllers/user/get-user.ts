import { FastifyReply, FastifyRequest } from "fastify";

export const getUser = async (req: FastifyRequest, res: FastifyReply) => {
	return res.status(200).send("Hello!");
};
