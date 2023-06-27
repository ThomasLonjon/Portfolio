import { useState, useEffect } from "react";

import Intro from "../../components/Intro/Intro";
import About from "../../components/About/About";
import Projects from "../../components/Projects/Projects";
import Bordless from "../../assets/img/Bordless.png";
import "./Home.scss";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2100);
  }, []);

  // ---------------------------------------------Return---------------------------------------------

  return (
    <>
      <div className={isLoading ? "loader" : "loaderHidden"}>
        <div className="contour"></div>
        <h1>Bienvenue sur mon Portfolio !</h1>
      </div>
      <div className="background" style={{ backgroundImage: `url(${Bordless})`, backgroundSize: "cover" }}>
        <Intro />
        <About />
        <Projects />
      </div>
    </>
  );
}

export default Home;
