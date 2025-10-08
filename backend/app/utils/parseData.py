import requests
from typing import Dict, Any, Optional
from dotenv import load_dotenv
import os

load_dotenv()

WALLET_ADDRESS = os.getenv("TARGET_WALLET")
API_URL = os.getenv("API_URL")

def _fetch_clearinghouse_state() -> Optional[Dict]:
    try:
        resp = requests.post(API_URL, json={
            "type": "clearinghouseState",
            "user": WALLET_ADDRESS
        }, timeout=5)
        return resp.json() if resp.status_code == 200 else None
    except Exception:
        return None

def _fetch_trades() -> list:
    try:
        resp = requests.post(API_URL, json={
            "type": "userFundingAndTrades",
            "user": WALLET_ADDRESS
        }, timeout=5)
        return resp.json().get("trades", []) if resp.status_code == 200 else []
    except Exception:
        return []

def calculate_metrics() -> Dict[str, Any]:
    # === Portfolio Value ===
    state = _fetch_clearinghouse_state()
    if not state or "marginSummary" not in state:
        return {"error": "failed to fetch state"}

    account_value = float(state["marginSummary"]["accountValue"])
    positions = state.get("assetPositions", [])

    # === Unrealized PnL ===
    unrealized_pnl = sum(float(p["position"].get("unrealizedPnl", 0)) for p in positions)
    pnl_pct = 0.0
    if account_value - unrealized_pnl > 0:
        pnl_pct = (unrealized_pnl / (account_value - unrealized_pnl)) * 100

    # === Win Rate ===
    trades = _fetch_trades()
    closed_trades = [t for t in trades if t.get("closedPnl") is not None]
    win_rate = 0.0

    if closed_trades:
        wins = [float(t["closedPnl"]) for t in closed_trades if float(t["closedPnl"]) > 0]
        losses = [abs(float(t["closedPnl"])) for t in closed_trades if float(t["closedPnl"]) < 0]
        win_count = len(wins)
        win_rate = round((win_count / len(closed_trades)) * 100, 1)
        total_profit = sum(wins)
        total_loss = sum(losses)

    return {
        "portfolioValue": account_value,
        "totalpnl": unrealized_pnl,
        "pnl24": pnl_pct,
        "winRate": win_rate,
        "currentPositions": len(positions),
        "totalTrades": len(closed_trades)
    }