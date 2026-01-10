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
    <div style={{ padding: "20px" }}>
      <h2>Explain Code</h2>
      
      <div style={{ marginBottom: "10px" }}>
        <label>
          Language:
          <select 
            value={language} 
            onChange={e => setLanguage(e.target.value)}
            style={{ marginLeft: "10px" }}
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
        rows={10}
        style={{ width: "100%", fontFamily: "monospace" }}
      />
      
      <br />
      
      <button 
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        {loading ? "Analyzing..." : "Explain Code"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Error: {error}
        </div>
      )}

      {explanation && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f5f5f5" }}>
          <h3>Explanation:</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{explanation}</pre>
        </div>
      )}
    </div>
  );
}
