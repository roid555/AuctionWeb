import PropTypes from "prop-types";

function FloatLabelBtn(props) {
  return (
    <div className={`form-floating mb-3 ${props.addClass}`}>
      <input
        id={props.labelName}
        type={props.type}
        className="form-control"
        placeholder=""
        required={props.required}
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.labelName}>{props.labelName}</label>
    </div>
  );
}

FloatLabelBtn.propTypes = {
  type: PropTypes.string.isRequired, // e.g., "text", "password"
  addClass: PropTypes.string, // Additional class names
  required: PropTypes.bool, // Whether the input is required
  value: PropTypes.string, // The value of the input
  onChange: PropTypes.func, // Function to handle input changes
  labelName: PropTypes.string.isRequired, // The label text
};

export default FloatLabelBtn;
