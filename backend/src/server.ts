import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { registerRoutes } from "./routes/index";
import { startListener } from "./services/asterWs";
import { aiAgentRoute } from './routes/aiAgentRoute';

dotenv.config();

const app = Fastify();
app.register(cors, { origin: true });
app.register(aiAgentRoute);

registerRoutes(app);

const PORT = Number(process.env.PORT) || 3001;

app.listen({ port: PORT }, async () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
    startListener("null"); // cюда эндпоинт

});
