import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from utils.parseData import calculate_metrics

trader_data = {"error": "initializing..."}

async def update_trader_data():
    global trader_data
    while True:
        try:
            loop = asyncio.get_event_loop()
            data = await loop.run_in_executor(None, calculate_metrics)
            trader_data = data
        except Exception as e:
            trader_data = {"error": str(e)}
        await asyncio.sleep(10)

@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(update_trader_data())
    yield
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass

app = FastAPI(title="Aegis Trader API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/trader")
async def get_trader_data():
    return trader_data