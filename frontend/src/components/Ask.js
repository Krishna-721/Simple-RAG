import { useState } from "react";
import { ask } from "../api";

export default function Ask() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    const res = await ask(question);
    setAnswer(res.answer || JSON.stringify(res));
  };

  return (
    <div>
      <h2>Ask</h2>
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        rows={4}
      />
      <br />
      <button onClick={handleSubmit}>Ask</button>
      <pre>{answer}</pre>
    </div>
  );
}
