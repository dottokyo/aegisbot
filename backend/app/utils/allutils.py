# import requests
# import json
# import re
# import time
# from urllib.parse import unquote
#
# # === CONFIG ===
# LEADER_URL = "https://www.bybit.com/copyTrade/trade-center/detail?leaderMark=HZIUKr%2Flxltp4nwG3s%2Bt7A%3D%3D"
# REFRESH_INTERVAL = 60  # Bybit может блокировать частые запросы
#
# # Раскодируем leaderMark (на всякий случай)
# leader_mark_encoded = LEADER_URL.split("leaderMark=")[1].split("&")[0]
# leader_mark = unquote(leader_mark_encoded)
#
# print(f"Отслеживаем трейдера: {leader_mark}")
#
# HEADERS = {
#     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
#     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
#     "Accept-Language": "en-US,en;q=0.9",
#     "Referer": "https://www.bybit.com/",
# }
#
# def fetch_leader_data():
#     try:
#         resp = requests.get(LEADER_URL, headers=HEADERS, timeout=10)
#         if resp.status_code != 200:
#             print(f"❌ HTTP {resp.status_code}")
#             return None
#
#         # Ищем JSON в теге __NEXT_DATA__
#         match = re.search(r'<script id="__NEXT_DATA__" type="application/json">([^<]+)</script>', resp.text)
#         if not match:
#             print("❌ Не найден __NEXT_DATA__ — возможно, защита Cloudflare")
#             return None
#
#         data_json = match.group(1)
#         data = json.loads(data_json)
#
#         # Путь к данным трейдера
#         props = data.get("props", {}).get("pageProps", {})
#         leader = props.get("leaderDetail")
#
#         if not leader:
#             print("❌ Данные трейдера не найдены в JSON")
#             return None
#
#         return leader
#
#     except Exception as e:
#         print("⚠️ Ошибка:", e)
#         return None
#
# def display_metrics(leader):
#     if not leader:
#         print("Нет данных")
#         return
#
#     stats = leader.get("stats", {})
#     print("\n" + "="*50)
#     print(f"👤 Трейдер: {leader.get('nickName', 'N/A')}")
#     print(f"💰 Total Portfolio Value: ${leader.get('totalEquity', 'N/A'):,}")
#     print(f"📈 24h PnL: ${stats.get('pnl24', 'N/A')}")
#     print(f"📊 24h ROI: {stats.get('roi24', 'N/A')}%")
#     print(f"🏆 Win Rate: {stats.get('winRate', 'N/A')}%")
#     print(f"👥 Followers: {leader.get('followerCount', 'N/A')}")
#     print(f"🔢 Total Trades: {stats.get('totalTrades', 'N/A')}")
#     print("="*50)
#
# if __name__ == "__main__":
#     while True:
#         leader_data = fetch_leader_data()
#         display_metrics(leader_data)
#         time.sleep(REFRESH_INTERVAL)