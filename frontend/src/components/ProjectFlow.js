import { useState } from "react";
import { projectFlow } from "../api";

export default function ProjectFlow() {
  const [path, setPath] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!path.trim()) {
      setError("Please enter a project path");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await projectFlow(path);
      if (res.project_flow) {
        setResult(res.project_flow);
      } else {
        setError(JSON.stringify(res));
      }
    } catch (err) {
      setError("Failed to fetch project flow");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <h2>📂 Project Flow Analyzer</h2>

      <input
        type="text"
        placeholder="Enter absolute project path (e.g., C:\\Users\\...)"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "1rem",
          border: "2px solid #e0e0e0",
          borderRadius: "6px",
          fontFamily: "monospace"
        }}
      />

      <br /><br />

      <button
        onClick={handleSubmit}
        disabled={loading || !path.trim()}
        style={{
          padding: "10px 30px",
          fontSize: "1rem",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading || !path.trim() ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
          opacity: loading || !path.trim() ? 0.6 : 1
        }}
      >
        {loading ? "🔄 Analyzing..." : "📊 Analyze Project"}
      </button>

      {error && (
        <div style={{
          color: "#d32f2f",
          marginTop: "15px",
          padding: "10px",
          backgroundColor: "#ffebee",
          borderRadius: "6px",
          borderLeft: "4px solid #d32f2f"
        }}>
          <strong>⚠️ Error:</strong>
          <pre style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            margin: "8px 0 0 0",
            maxHeight: "300px",
            overflowY: "auto"
          }}>{error}</pre>
        </div>
      )}

      {result && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "6px",
          borderLeft: "4px solid #667eea"
        }}>
          <h3 style={{ marginTop: 0, color: "#333" }}>📈 Project Structure:</h3>
          <pre style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            margin: 0,
            maxHeight: "600px",
            overflowY: "auto",
            fontFamily: "monospace",
            fontSize: "0.9rem"
          }}>{result}</pre>
        </div>
      )}
    </div>
  );
}
