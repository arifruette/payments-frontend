import { useState } from "react";
import { api } from "../../api/client";

export function PaymentsPanel({ pushLog }: { pushLog: (s: string) => void }) {
    const [userId, setUserId] = useState("");
    const [amount, setAmount] = useState(100);

    return (
        <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
            <h2 style={{ marginTop: 0 }}>Payments</h2>

            <label>User ID (UUID)</label>
            <input value={userId} onChange={(e) => setUserId(e.target.value)} style={{ width: "100%", marginBottom: 10 }} />

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                    onClick={async () => {
                        try {
                            const r = await api.payments.createAccount(userId);
                            pushLog(`createAccount: ${JSON.stringify(r)}`);
                        } catch (e: any) {
                            pushLog(`createAccount ERROR: ${e.message}`);
                        }
                    }}
                >
                    Create account
                </button>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{ width: 140 }}
                />

                <button
                    onClick={async () => {
                        try {
                            const r = await api.payments.topUp(userId, amount);
                            pushLog(`topUp: ${JSON.stringify(r)}`);
                        } catch (e: any) {
                            pushLog(`topUp ERROR: ${e.message}`);
                        }
                    }}
                >
                    Top up
                </button>

                <button
                    onClick={async () => {
                        try {
                            const r = await api.payments.balance(userId);
                            pushLog(`balance: ${JSON.stringify(r)}`);
                        } catch (e: any) {
                            pushLog(`balance ERROR: ${e.message}`);
                        }
                    }}
                >
                    Get balance
                </button>
            </div>
        </div>
    );
}
