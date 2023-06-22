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

function About() {
  const devSkills = [
    { name: "HTML", img: html },
    { name: "CSS", img: css },
    { name: "JavaScript", img: javascript },
    { name: "React", img: react },
    { name: "Node + Express", img: node },
    { name: "MySQL", img: mysql },
    { name: "Git / GitHub", img: github },
    { name: "Figma", img: figma },
  ];

  const urbaSkills = [
    { name: "Mapbox GL JS", img: mapbox },
    { name: "Qgis", img: qgis },
    { name: "Autocad", img: autocad },
    { name: "Sketchup", img: sketchup },
    { name: "Photoshop", img: photoshop },
    { name: "Indesign", img: indesign },
    { name: "Illustrator", img: illustator },
  ];

  return (
    <div>
      <div className="AboutMe">
        <div className="tape-section"></div>
        <h1>À PROPOS</h1>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia
        </p>
        <p>
          Looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
          cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
          1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45
          BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of
          Lorem Ipsum
        </p>
      </div>

      <div className="skills">
        <div className="tape-section"></div>
        <h1>COMPÉTENCES</h1>
        <div className="SkillsSection">
          <div className="devSkillsContainer">
            {devSkills.map((skill) => {
              return (
                <div className="skillButton" key={devSkills.indexOf(skill)}>
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

      <div className="contactMe">
        <div className="tape-section"></div>
        <h1>CONTACT</h1>
        <div className="contactContainer">
          <div className="contactButton">
            <img src={linkedin} alt="linkedin" />
            <span>LinkedIn</span>
          </div>
          <div className="contactButton">
            <img src={github} alt="github" />
            <span>Github</span>
          </div>
          <div className="contactButton">
            <img src={cv} alt="cv" />
            <span>Mon CV</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;