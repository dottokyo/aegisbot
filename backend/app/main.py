# server.py
import requests
import time
import threading
from flask import Flask, jsonify

WALLET = "0xe077baf4d95fa0749c817a4a47791bdd91322ef7"
DATA = {
    "portfolioValue": 0,
    "pnl24": 0,
    "winRate": 0
}


def fetch_data():
    global DATA
    while True:
        try:
            # State
            state = requests.post("https://api.hyperliquid.xyz/info", json={
                "type": "clearinghouseState",
                "user": WALLET
            }, timeout=5).json()

            equity = float(state["marginSummary"]["accountValue"])

            # Trades for win rate
            trades_resp = requests.post("https://api.hyperliquid.xyz/info", json={
                "type": "userFundingAndTrades",
                "user": WALLET
            }, timeout=5)
            trades = trades_resp.json().get("trades", []) if trades_resp.status_code == 200 else []

            closed = [t for t in trades if t.get("closedPnl") is not None]
            if closed:
                wins = sum(1 for t in closed if float(t["closedPnl"]) > 0)
                win_rate = round((wins / len(closed)) * 100, 1)
            else:
                win_rate = 0

            # PnL — сумма unrealized PnL по позициям
            positions = state.get("assetPositions", [])
            unrealized_pnl = sum(float(p["position"].get("unrealizedPnl", 0)) for p in positions)
            pnl_pct = (unrealized_pnl / (equity - unrealized_pnl)) * 100 if equity > 0 else 0

            DATA = {
                "portfolioValue": equity,
                "pnl24": pnl_pct,
                "winRate": win_rate
            }

        except Exception as e:
            print("Error fetching:", e)
        time.sleep(10)


app = Flask(__name__, static_folder=".")


@app.route("/api/trader")
def trader_api():
    return jsonify(DATA)


# Раздаём статику (index.html, css, js и т.д.)
@app.route("/")
def index():
    return app.send_static_file("index.html")


if __name__ == "__main__":
    threading.Thread(target=fetch_data, daemon=True).start()
    print("🚀 Aegis LARP запущен на http://localhost:5000 or 5001")
    app.run(host="0.0.0.0", port=5000 | 5001)