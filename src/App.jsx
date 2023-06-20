import Intro from "./components/Intro/Intro";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import "./App.scss";

function App() {
  // ---------------------------------------------Return---------------------------------------------

  return (
    <div className="background">
      <Intro />
      <div className="secondPart">
        <About />
        <Projects />
      </div>
    </div>
  );
}

export default App;
