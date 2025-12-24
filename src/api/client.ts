const API_BASE = "/api";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers);
    if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

    const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

    const text = await res.text();
    const body: unknown = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const msg = (body as any)?.error ?? (body as any)?.message ?? `${res.status} ${res.statusText}`;
        throw new Error(msg);
    }
    return body as T;
}

export const api = {
    payments: {
        createAccount: (userId: string) =>
            request<{ created: boolean }>("/payments/account", { method: "POST", body: JSON.stringify({ userId }) }),
        topUp: (userId: string, amount: number) =>
            request<any>("/payments/topup", { method: "POST", body: JSON.stringify({ userId, amount }) }),
        balance: (userId: string) =>
            request<any>(`/payments/balance/${encodeURIComponent(userId)}`, { method: "GET" }),
    },
    orders: {
        create: (userId: string, amount: number, description: string) =>
            request<{ orderId: string; status: string }>("/orders", {
                method: "POST",
                body: JSON.stringify({ userId, amount, description }),
            }),
        list: (userId: string, limit = 50, offset = 0) =>
            request<any[]>(`/orders?user_id=${encodeURIComponent(userId)}&limit=${limit}&offset=${offset}`, { method: "GET" }),
        get: (id: string) => request<any>(`/orders/${encodeURIComponent(id)}`, { method: "GET" }),
    },
};
