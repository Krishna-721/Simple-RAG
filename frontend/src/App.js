import Ask from "./components/Ask";
import ExplainCode from "./components/ExplainCode";
import ProjectFlow from "./components/ProjectFlow";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🚀 CodeScope</h1>
        <p className="app-subtitle">Your AI-powered code analysis assistant</p>
      </header>
      
      <main className="app-main">
        <div className="section-container">
          <Ask />
        </div>
        <div className="section-container">
          <ExplainCode />
        </div>
        <div className="section-container">
          <ProjectFlow />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>CodeScope © 2026 - Analyze code with AI</p>
      </footer>
    </div>
  );
}

export default App;
