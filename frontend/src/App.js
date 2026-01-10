import Ask from "./components/Ask";
import ExplainCode from "./components/ExplainCode";
import ProjectFlow from "./components/ProjectFlow";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>CodeScope</h1>
      <Ask />
      <ExplainCode/>
      <ProjectFlow/>
    </div>
  );
}

export default App;
