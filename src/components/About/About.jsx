import Skill from "./Skill";

function About() {
  const skills = [
    { name: "HTML" },
    { name: "CSS" },
    { name: "JavaScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "Express" },
    { name: "MySQL" },
    { name: "Sass" },
    { name: "Git / GitHub" },
    { name: "Figma" },
    { name: "Qgis" },
    { name: "Autocad" },
    { name: "Sketchup" },
    { name: "Photoshop" },
    { name: "Indesign" },
    { name: "Illustrator" },
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
        <div className="skillComponent">
          {skills.map((skill) => {
            return <Skill key={skills.indexOf(skill)} name={skill.name} />;
          })}
        </div>
      </div>

      <div className="contactMe">
        <div className="tape-section"></div>
        <h1>CONTACT</h1>
      </div>
    </div>
  );
}

export default About;
