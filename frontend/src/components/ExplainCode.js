import { useState } from "react";
import { explainCode } from "../api";

export default function ExplainCode() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("Please enter code to explain");
      return;
    }

    setLoading(true);
    setError("");
    setExplanation("");

    try {
      const res = await explainCode(code, language);
      setExplanation(res.explanation || JSON.stringify(res));
    } catch (err) {
      setError(err.message || "Failed to explain code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>💻 Explain Code</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "1rem", fontWeight: "500", color: "#333" }}>
          Language:
          <select 
            value={language} 
            onChange={e => setLanguage(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "8px 12px",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "2px solid #e0e0e0",
              backgroundColor: "#fff",
              cursor: "pointer"
            }}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
          </select>
        </label>
      </div>

      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={12}
        style={{
          width: "100%",
          fontFamily: "'Monaco', 'Courier New', monospace",
          padding: "10px",
          border: "2px solid #e0e0e0",
          borderRadius: "6px",
          fontSize: "0.95rem",
          resize: "vertical"
        }}
      />
      
      <br />
      
      <button 
        onClick={handleSubmit}
        disabled={loading || !code.trim()}
        style={{
          marginTop: "15px",
          padding: "10px 30px",
          fontSize: "1rem",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading || !code.trim() ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
          opacity: loading || !code.trim() ? 0.6 : 1
        }}
      >
        {loading ? "🔄 Analyzing..." : "🔍 Explain Code"}
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
          ⚠️ Error: {error}
        </div>
      )}

      {explanation && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "6px",
          borderLeft: "4px solid #667eea"
        }}>
          <h3 style={{ marginTop: 0, color: "#333" }}>📝 Explanation:</h3>
          <pre style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            margin: 0,
            maxHeight: "500px",
            overflowY: "auto"
          }}>{explanation}</pre>
        </div>
      )}
    </div>
  );
}
