import fastify from "fastify";

// Components
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod";

// Env
import { env } from "./env";
import { userRoutes } from "./http/controllers/user/routes";

// Routes

export const app = fastify();

app.register(cors, {
	origin: "*",
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: "10m",
	},
});

app.register(userRoutes);

app.setErrorHandler((error, req, res) => {
	if (error instanceof ZodError) {
		return res.status(400).send({
			message: "Validation Error",
			issues: error.format(),
		});
	}

	if (env.NODE_ENV === "dev") {
		console.log(error);
	}

	return res.status(500).send({ message: "Internal Server Error" });
});
