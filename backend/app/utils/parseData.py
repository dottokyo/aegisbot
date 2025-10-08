import requests
from typing import Dict, Any, Optional, List
import os
from dotenv import load_dotenv

load_dotenv()

WALLET_ADDRESS = os.getenv("TARGET_WALLET")
API_URL = os.getenv("API_URL", "https://api.hyperliquid.xyz/info")


def _fetch_clearinghouse_state() -> Optional[Dict]:
    try:
        resp = requests.post(
            API_URL,
            json={"type": "clearinghouseState", "user": WALLET_ADDRESS},
            timeout=3
        )
        return resp.json() if resp.status_code == 200 else None
    except Exception as e:
        print(f"Error fetching state: {e}")
        return None


def _fetch_user_fills() -> List[Dict]:
    try:
        resp = requests.post(
            API_URL,
            json={"type": "userFills", "user": WALLET_ADDRESS},
            timeout=3
        )
        if resp.status_code != 200:
            print(f"HTTP {resp.status_code}: {resp.text}")
            return []

        data = resp.json()

        # Hyperliquid может вернуть {"result": [...]} или сразу [...]
        if isinstance(data, dict) and "result" in data:
            fills = data["result"]
        elif isinstance(data, list):
            fills = data
        else:
            print(f"Unexpected response format: {type(data)}")
            return []

        if not isinstance(fills, list):
            print(f"'result' is not a list: {type(fills)}")
            return []

        print(f"✅ Successfully fetched {len(fills)} fills")
        return fills

    except Exception as e:
        print(f"❌ Exception in _fetch_user_fills: {e}")
        return []


def calculate_metrics() -> Dict[str, Any]:
    # === Portfolio & Unrealized PnL ===
    state = _fetch_clearinghouse_state()
    if not state or "marginSummary" not in state:
        return {"error": "failed to fetch clearinghouse state"}

    margin = state["marginSummary"]
    account_value = float(margin["accountValue"])

    current_positions = []
    unrealized_pnl = 0.0

    for asset_pos in state.get("assetPositions", []):
        pos = asset_pos.get("position")
        if not pos:
            continue
        szi = pos.get("szi", "0")
        if float(szi) == 0:
            continue  # no active position
        coin = pos.get("coin")
        if coin:
            current_positions.append(coin)
        unrealized_pnl += float(pos.get("unrealizedPnl", "0"))

    # === Unrealized PnL % ===
    base_equity = account_value - unrealized_pnl
    unrealized_pct = 0.0
    if base_equity > 0:
        unrealized_pct = (unrealized_pnl / base_equity) * 100

    # === Realized PnL & Win Rate from FILLS ===
    fills = _fetch_user_fills()
    realized_pnl_total = 0.0
    winning_trades = 0
    total_trades = 0

    for fill in fills:
        pnl_str = fill.get("pnl")
        if pnl_str is None:
            continue
        try:
            pnl = float(pnl_str)
        except (ValueError, TypeError):
            print(f"Invalid pnl value: {pnl_str} for fill: {fill}")
            continue

        total_trades += 1
        realized_pnl_total += pnl
        if pnl > 0:
            winning_trades += 1

    win_rate = round((winning_trades / total_trades) * 100, 1) if total_trades > 0 else 0.0

    return {
        "portfolioValue": round(account_value, 2),
        "unrealizedPnl": round(unrealized_pnl, 2),
        "unrealizedPnlPct": round(unrealized_pct, 2),
        "realizedPnl": round(realized_pnl_total, 2),
        "winRate": win_rate,
        "totalTrades": total_trades,
        "currentPositions": current_positions,
    }
