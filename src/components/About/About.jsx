import html from "../../assets/img/html5.svg";
import css from "../../assets/img/css3.svg";
import javascript from "../../assets/img/js.svg";
import react from "../../assets/img/reactjs.svg";
import node from "../../assets/img/nodejs.svg";
import mysql from "../../assets/img/mysql.svg";
import github from "../../assets/img/gitlab.svg";
import figma from "../../assets/img/figma.svg";
import qgis from "../../assets/img/qgis.svg";
import mapbox from "../../assets/img/mapbox.svg";
import autocad from "../../assets/img/autocad.svg";
import sketchup from "../../assets/img/sketchup.svg";
import photoshop from "../../assets/img/ps.svg";
import indesign from "../../assets/img/id.svg";
import illustator from "../../assets/img/ai.svg";
import linkedin from "../../assets/img/linkedin.svg";
import cv from "../../assets/img/cv.svg";
import cvPdf from "../../assets/img/CV-Thomas Lonjon.pdf";
import paper2 from "../../assets/img/paper2.jpg";
import paper3 from "../../assets/img/paper3.jpg";
import "./About.scss";

function About() {
  const textAbout = {
    paragraphe1: "Bienvenue sur mon Portfolio !",
    paragraphe2:
      " Ingénieur et architecte-urbaniste, j'ai travaillé plusieurs années en agence d'urbanisme et de paysage où j’ai participé à des projets de rénovation urbaine, qui m'ont captivé. Ma passion pour la cartographie m'a conduit à me former au développement web afin d'exploiter le potentiel narratif des cartes interactives 3D.",
    paragraphe3:
      "Aujourd'hui, je cherche à collaborer avec des personnes partageant les mêmes intérêts, afin de repousser les limites de la cartographie, en la rendant dynamique et participative. N'hésitez pas à me contacter si vous souhaitez discuter de projets passionnants où la cartographie joue un rôle central. Je serais ravi de mettre mes compétences et ma passion au service de votre projet.",
    paragraphe4: "Merci de votre visite et à bientôt  !",
  };

  const devSkills = [
    { name: "HTML", img: html },
    { name: "CSS", img: css },
    { name: "JavaScript", img: javascript },
    { name: "React", img: react },
    { name: "Node + Express", img: node },
    { name: "MySQL", img: mysql },
    { name: "Git / GitHub", img: github },
  ];

  const urbaSkills = [
    { name: "Mapbox GL JS", img: mapbox },
    { name: "Qgis", img: qgis },
    { name: "Autocad", img: autocad },
    { name: "Sketchup", img: sketchup },
    { name: "Photoshop", img: photoshop },
    { name: "Indesign", img: indesign },
    { name: "Illustrator", img: illustator },
    { name: "Figma", img: figma },
  ];

  return (
    <div>
      <div className="AboutMe" style={{ backgroundImage: `url(${paper2})`, backgroundSize: "cover" }}>
        <div className="tape-section"></div>
        <h1>À PROPOS</h1>
        <div className="textAbout">
          <p>{textAbout.paragraphe1}</p>
          <p>{textAbout.paragraphe2}</p>
          <p>{textAbout.paragraphe3}</p>
          <p>{textAbout.paragraphe4}</p>
        </div>
      </div>

      <div className="skills" style={{ backgroundImage: `url(${paper3})`, backgroundSize: "cover" }}>
        <div className="tape-section"></div>
        <h1>COMPÉTENCES</h1>
        <div className="SkillsSection">
          <div className="devSkillsContainer">
            {devSkills.map((skill) => {
              return (
                <div className="skillButton skillButtonLarge" key={devSkills.indexOf(skill)}>
                  <span>{skill.name}</span>
                  <img src={skill.img} alt={skill.name} />
                </div>
              );
            })}
          </div>
          <div className="urbaSkillsContainer">
            {urbaSkills.map((skill) => {
              return (
                <div className="skillButton" key={urbaSkills.indexOf(skill)}>
                  <span>{skill.name}</span>
                  <img src={skill.img} alt={skill.name} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="contactMe" style={{ backgroundImage: `url(${paper3})`, backgroundSize: "cover" }}>
        <div className="tape-section"></div>
        <h1>CONTACT</h1>
        <div className="contactContainer">
          <a
            href="https://www.linkedin.com/in/thomaslonjon/"
            target="_blank"
            rel="noopener noreferrer"
            className="contactButton"
          >
            <span>LinkedIn</span>
            <img src={linkedin} alt="linkedin" />
          </a>
          <a href="https://github.com/ThomasLonjon" target="_blank" rel="noopener noreferrer" className="contactButton">
            <span>Github</span>
            <img src={github} alt="github" />
          </a>

          <a href={cvPdf} download="CV-Thomas-Lonjon.pdf" className="contactButton">
            <span>Mon CV</span>
            <img src={cv} alt="cv" />
          </a>
        </div>
      </div>

      <div className="conclusion-div">
        <p>
          → Découvrez en plus ←
          <br />→ Depuis un écran d&apos;ordinateur ←
        </p>
      </div>
    </div>
  );
}

export default About;
