import { FastifyInstance } from "fastify";
import db from "../db/index.js";

interface FollowBody {
    subscriber_wallet: string;
    trader_wallet: string;
    ratio: number;
}

export default async function followRoutes(app: FastifyInstance) {
    app.post("/", async (req, res) => {
    const { subscriber_wallet, trader_wallet, ratio } = req.body as FollowBody;
    if (!subscriber_wallet || !trader_wallet)
        return res.code(400).send({ error: "missing fields" });

    db.prepare(
        "INSERT INTO subscriptions (subscriber_wallet, trader_wallet, ratio) VALUES (?, ?, ?)"
    ).run(subscriber_wallet, trader_wallet, ratio);

    return { ok: true };
    });

    app.get("/", async () => {
        return db.prepare("SELECT * FROM subscriptions").all();
    });
}
