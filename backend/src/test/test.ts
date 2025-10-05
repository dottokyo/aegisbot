const ws = new WebSocket('wss://fstream.asterdex.com/ws/btcusdt@aggTrade');

ws.onopen = () => {
    console.log('🚀 Соединение установлено');
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('📩 Получено сообщение:', data);
};

ws.onerror = (error) => {
    console.error('❌ Ошибка WebSocket:', error);
};

ws.onclose = () => {
    console.log('🛑 Соединение закрыто');
};
