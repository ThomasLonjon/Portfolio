import PropTypes from "prop-types";

function Skill({ name, key }) {
  return (
    <div className="skillButton" key={key}>
      {name}
    </div>
  );
}

Skill.propTypes = {
  name: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};
export default Skill;
