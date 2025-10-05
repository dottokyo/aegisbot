import axios from "axios";

const api = axios.create({
    baseURL: process.env.ASTER_BASE_URL,
    headers: { "X-API-KEY": process.env.ASTER_API_KEY ?? "" },
});

export async function getPositions(wallet: string) {
    const { data } = await api.get(`/v1/positions?wallet=${wallet}`);
    return data;
}

export async function placeOrder(apiKey: string, payload: any) {
    const { data } = await axios.post(
        `${process.env.ASTER_BASE_URL}/v1/order`,
        payload,
        { headers: { "X-API-KEY": apiKey } }
    );
    return data;
}
