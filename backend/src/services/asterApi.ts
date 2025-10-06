import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.ASTER_BASE_URL;  // Основной API URL

const api = axios.create({
    baseURL: url,
    headers: {
        'Authorization': `Bearer ${process.env.ASTER_API_KEY}`,  // API-ключ
    },
});

export async function getAccountInfo() {
    try {
        const response = await api.get('v1/account');
        return response.data;
    } catch (error) {
        console.error('Error fetching account info:', error);
    }
}

export async function getMarketData() {
    try {
        const response = await api.get('v1/depth');
        return response.data;
    } catch (error) {
        console.error('Error fetching market data:', error);
    }
}

export async function placeOrder(symbol: string, 
    side: "BUY" | "SELL", 
    positionSide: "LONG" | "SHORT", 
    amount: number, 
    avgPrice: number) {
    try {
        const response = await api.post('v1/order', {
        symbol,
        side,
        amount,
        avgPrice,
        positionSide

        });
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
    }
}

// order response
// {
//  	"clientOrderId": "testOrder",
//  	"cumQty": "0",
//  	"cumQuote": "0",
//  	"executedQty": "0",
//  	"orderId": 22542179,
//  	"avgPrice": "0.00000",
//  	"origQty": "10",
//  	"price": "0",
//   	"reduceOnly": false,
//   	"side": "BUY",
//   	"positionSide": "SHORT",
//   	"status": "NEW",
//   	"stopPrice": "9300",		// please ignore when order type is TRAILING_STOP_MARKET
//   	"closePosition": false,   // if Close-All
//   	"symbol": "BTCUSDT",
//   	"timeInForce": "GTC",
//   	"type": "TRAILING_STOP_MARKET",
//   	"origType": "TRAILING_STOP_MARKET",
//   	"activatePrice": "9020",	// activation price, only return with TRAILING_STOP_MARKET order
//   	"priceRate": "0.3",			// callback rate, only return with TRAILING_STOP_MARKET order
//  	"updateTime": 1566818724722,
//  	"workingType": "CONTRACT_PRICE",
//  	"priceProtect": false            // if conditional order trigger is protected	
// }