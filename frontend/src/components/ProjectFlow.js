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

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Project Flow Analyzer</h2>

      <input
        type="text"
        placeholder="Enter absolute project path"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />

      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Project"}
      </button>

      {error && (
        <pre style={{ color: "red", marginTop: "20px" }}>
          {error}
        </pre>
      )}

      {result && (
        <pre style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          {result}
        </pre>
      )}
    </div>
  );
}
