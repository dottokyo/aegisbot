import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { registerRoutes } from "./routes/index.js";
import { startListener } from "./services/asterWs.js";

dotenv.config();

const app = Fastify();
app.register(cors, { origin: true });

registerRoutes(app);

const PORT = Number(process.env.PORT) || 3001;

app.listen({ port: PORT }, async () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
    startListener(); // cюда эндпоинт

});
