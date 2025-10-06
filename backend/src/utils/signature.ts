import { createHmac } from 'crypto';


//sha256 decoder
export function generateSignature(secretKey: string, params: Record<string, string | number>): string {
    const queryString = new URLSearchParams(params).toString();
    return createHmac('sha256', secretKey)
    .update(queryString)
    .digest('hex');
}
