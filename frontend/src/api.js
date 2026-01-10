const BASE_URL = "http://127.0.0.1:8000/api";

async function safeJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text);
  }
}

export async function ask(question) {
  const res = await fetch(`${BASE_URL}/ask/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  return safeJson(res);
}

export async function explainCode(code, language) {
  const res = await fetch(`${BASE_URL}/explain-code/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, code })
  });
  return safeJson(res);
}

export async function projectFlow(path) {
  const res = await fetch(`${BASE_URL}/project-flow/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project_path: path })
  });
  return safeJson(res);
}
