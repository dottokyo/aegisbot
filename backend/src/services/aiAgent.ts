export class AITradingAgent {
    private isTradingActive: boolean = false;
    constructor() {}

    tradeDecision(order: AsterOrderEvent) {
        console.log("🚀 Trade decision received:", order);

        if (order.side === 'BUY') {
            this.placeOrder(order.symbol, 'BUY', order.amount);
        } else if (order.side === 'SELL') {
            this.placeOrder(order.symbol, 'SELL', order.amount);
        } else {
            console.log('Invalid order side:', order.side);
        }

        console.log("Trading active:", this.isTradingActive);
        if (!this.isTradingActive) return;
        console.log(`Received order: ${order.symbol}, ${order.side}, ${order.amount}`);

    }

    placeOrder(symbol: string, side: string, amount: number) {
        console.log(`Placing order: ${side} ${amount} of ${symbol}`);
        // Вставьте API вызов AsterDex для размещения ордера
    }

    stopTrading() {
        this.isTradingActive = false;
        console.log('Trading stopped');
    }
}
