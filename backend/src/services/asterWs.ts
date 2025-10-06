import WebSocket from "ws";
import db from "../db/index.js";
import dotenv from "dotenv";

dotenv.config();
const url: string = process.env.ASTER_WS_URL!;
const channel: string = "null";
// base url from env for ws

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
        // mirrorOrder(data);
        console.log('📩 WebSocket resp:', data)
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