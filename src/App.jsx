import { Route, Routes } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home";
import Holimap from "./pages/Holimap";
import GuessWhat from "./pages/GuessWhat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Holimap" element={<Holimap />} />
        <Route path="/GuessWhat" element={<GuessWhat />} />
      </Routes>
    </div>
  );
}

export default App;
