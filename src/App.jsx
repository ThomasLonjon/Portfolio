import { Route, Routes } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home/Home";
import Holymap from "./pages/Holymap/Holymap";
import GuessWhat from "./pages/GuessWhat/GuessWhat";
import { ZindexProvider } from "./context/Zindex";

function App() {
  return (
    <div className="App">
      <ZindexProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Holymap" element={<Holymap />} />
          <Route path="/GuessWhat" element={<GuessWhat />} />
        </Routes>
      </ZindexProvider>
    </div>
  );
}

export default App;
