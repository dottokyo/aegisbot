import { FastifyInstance } from "fastify";
import { AITradingAgent } from "../services/aiAgent";  

const aiAgent = new AITradingAgent(); 


// model start and stop trading logic
export async function aiAgentRoute(app: FastifyInstance) {
    app.post("/start-trading", async (request, reply) => {
        aiAgent.tradeDecision(request.body);  // decision data
        reply.send({ status: 'Trading started' });
    });

    app.post("/stop-trading", async (request, reply) => {
        aiAgent.stopTrading();
        reply.send({ status: 'Trading stopped' });
    });
}
