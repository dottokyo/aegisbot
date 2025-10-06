import WebSocket from "ws";
import dotenv from "dotenv";
import { AITradingAgent } from "./aiAgent.js";

dotenv.config();
const url: string = process.env.ASTER_WS_URL!;
const channel: string = "null";
// base url from env for ws
const aiAgent = new AITradingAgent(); 

interface AsterOrderEvent {
    type: string;
    user: string;       
    symbol: string;
    side: string;       
    amount: number;
    leverage: number;
}

export function startListener(channel: string) {
    console.log("📡 WebSocket listener started...");
    const ws = new WebSocket(url + channel);

    ws.onopen = () => {
        console.log(`📡 Connected to Aster WebSocket: ${url}`);
    };

    ws.onmessage = (event) => {
        
        const data: any = JSON.parse(event.data) as AsterOrderEvent;
        console.log('📩 WebSocket resp:', data)
        aiAgent.tradeDecision(data);  
    };
    // error and retrying
    ws.onerror = (error) => {
        console.error('❌ websocket error:', error);
    };

    ws.onclose = () => {
        console.log('🛑 connection closed');
        setTimeout(function() {
        startListener(channel);
    }, 1000);
    };
}