import { useState } from "react";
import { ask } from "../api";

export default function Ask() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await ask(question);
      setAnswer(res.answer || JSON.stringify(res));
    } catch (err) {
      setError(err.message || "Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <h2>❓ Ask Question</h2>
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask your question here... (Ctrl+Enter to submit)"
        rows={5}
        style={{
          width: "100%",
          padding: "10px",
          fontFamily: "inherit",
          fontSize: "1rem",
          border: "2px solid #e0e0e0",
          borderRadius: "6px",
          resize: "vertical"
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "10px 30px",
          fontSize: "1rem",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.3s ease",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "🔄 Processing..." : "✨ Ask"}
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

      {answer && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "6px",
          borderLeft: "4px solid #667eea"
        }}>
          <h3 style={{ marginTop: 0, color: "#333" }}>Answer:</h3>
          <pre style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            margin: 0,
            maxHeight: "400px",
            overflowY: "auto"
          }}>{answer}</pre>
        </div>
      )}
    </div>
  );
}
