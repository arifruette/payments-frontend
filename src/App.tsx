import { useState } from "react";
import { PaymentsPanel } from "./features/payments/PaymentsPanel";
import { OrdersPanel } from "./features/orders/OrdersPanel";
import { LogBox } from "./shared/LogBox";

export default function App() {
    const [logs, setLogs] = useState<string[]>([]);
    const pushLog = (s: string) =>
        setLogs((prev) => {
            const next = [`${new Date().toLocaleTimeString()}  ${s}`, ...prev];
            return next.slice(0, 30);
        });

    return (
        <div style={{ maxWidth: 1100, margin: "20px auto", padding: 16, fontFamily: "system-ui, sans-serif" }}>
            <h1 style={{ marginTop: 0 }}>Testing panel</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <PaymentsPanel pushLog={pushLog} />
                <OrdersPanel pushLog={pushLog} />
            </div>

            <div style={{ marginTop: 16 }}>
                <LogBox lines={logs} />
            </div>
        </div>
    );
}
