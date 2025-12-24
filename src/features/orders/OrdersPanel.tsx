import { useState } from "react";
import { api } from "../../api/client";

export function OrdersPanel({ pushLog }: { pushLog: (s: string) => void }) {
    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState(50);
    const [description, setDescription] = useState("test order");
    const [orders, setOrders] = useState<any[]>([]);
    const [orderId, setOrderId] = useState("");

    return (
        <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
            <h2 style={{ marginTop: 0 }}>Orders</h2>

            <label>User ID (UUID)</label>
            <input value={userId} onChange={(e) => setUserId(e.target.value)} style={{ width: "100%", marginBottom: 10 }} />

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} style={{ width: 140 }} />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: 260 }}
                    placeholder="description"
                />
                <button
                    onClick={async () => {
                        try {
                            const r = await api.orders.create(userId, amount, description);
                            pushLog(`createOrder: ${JSON.stringify(r)}`);
                            setOrderId(r.orderId);
                        } catch (e: any) {
                            pushLog(`createOrder ERROR: ${e.message}`);
                        }
                    }}
                >
                    Create order
                </button>

                <button
                    onClick={async () => {
                        try {
                            const r = await api.orders.list(userId, 50, 0);
                            setOrders(r);
                            pushLog(`listOrders: got ${Array.isArray(r) ? r.length : "?"} items`);
                        } catch (e: any) {
                            pushLog(`listOrders ERROR: ${e.message}`);
                        }
                    }}
                >
                    List orders
                </button>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                <input value={orderId} onChange={(e) => setOrderId(e.target.value)} style={{ width: 360 }} placeholder="orderId" />
                <button
                    onClick={async () => {
                        try {
                            const r = await api.orders.get(orderId);
                            pushLog(`getOrder: ${JSON.stringify(r)}`);
                        } catch (e: any) {
                            pushLog(`getOrder ERROR: ${e.message}`);
                        }
                    }}
                >
                    Get order
                </button>

                <button
                    onClick={async () => {
                        // удобная “демонстрация асинхронности”: раз в 2s обновляем список 5 раз
                        try {
                            for (let i = 0; i < 5; i++) {
                                const r = await api.orders.list(userId, 50, 0);
                                setOrders(r);
                                pushLog(`poll#${i + 1}: refreshed orders`);
                                await new Promise((s) => setTimeout(s, 2000));
                            }
                        } catch (e: any) {
                            pushLog(`poll ERROR: ${e.message}`);
                        }
                    }}
                >
                    Poll status (10s)
                </button>
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>id</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>amount</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>description</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((o) => (
                        <tr key={o.id}>
                            <td style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}>{o.id}</td>
                            <td style={{ borderBottom: "1px solid #eee" }}>{o.amount}</td>
                            <td style={{ borderBottom: "1px solid #eee" }}>{o.description}</td>
                            <td style={{ borderBottom: "1px solid #eee", fontWeight: 600 }}>{o.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
