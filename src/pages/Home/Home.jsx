import Intro from "../../components/Intro/Intro";
import About from "../../components/About/About";
import Projects from "../../components/Projects/Projects";
import Bordless from "../../assets/img/Bordless.png";

function Home() {
  // ---------------------------------------------Return---------------------------------------------

  return (
    <div className="background">
      <Intro />
      <About />
      <Projects />
      <img src={Bordless} alt="Bordless" />
    </div>
  );
}

export default Home;
