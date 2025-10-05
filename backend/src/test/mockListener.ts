// import { startListener } from "../listener.js";

// export function startMock() {
//     console.log("🧪 Starting mock WS...");
//     setInterval(() => {
//         const fakeEvent = {
//         type: "order.opened",
//         user: "0xDEF123",
//         symbol: "BTC/USDT",
//         side: "long",
//         amount: Math.random() * 0.1 + 0.01,
//         leverage: 5,
//         };
//     console.log("🎯 Mock event:", fakeEvent);
//     }, 5000);
// }

import { mirrorOrder } from "../services/mirror.js";

export function startMock() {
    console.log("🧪 Mock listener started...");
    setInterval(() => {
        const fakeEvent = {
        type: "order.opened",
        user: "0xDEF123",
        symbol: "BTC/USDT",
        side: "long",
        amount: 0.05,
        leverage: 3,
        };
    mirrorOrder(fakeEvent);
    }, 7000);
}
