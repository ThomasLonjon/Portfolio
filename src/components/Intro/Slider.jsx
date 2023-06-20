import PropTypes from "prop-types";

function Slider({ maxRange, defaultRange, unit, rangeValue, setRangeValue }) {
  return (
    <div className="sliderContainer">
      <strong className="no-cursor">
        <input
          className="slider"
          type="range"
          min="5"
          max={maxRange}
          defaultValue={defaultRange}
          step="1"
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <p className="textSlider">
          {rangeValue} {unit}
        </p>
      </strong>
    </div>
  );
}

Slider.propTypes = {
  maxRange: PropTypes.number.isRequired,
  defaultRange: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  rangeValue: PropTypes.number.isRequired,
  setRangeValue: PropTypes.func.isRequired,
};

export default Slider;
