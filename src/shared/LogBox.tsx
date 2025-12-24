export function LogBox({ lines }: { lines: string[] }) {
    return (
        <div style={{ background: "#111", color: "#ddd", padding: 12, borderRadius: 8, minHeight: 120 }}>
    <div style={{ fontWeight: 600, marginBottom: 8 }}>Logs</div>
    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{lines.join("\n")}</pre>
    </div>
);
}