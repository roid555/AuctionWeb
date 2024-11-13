import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function SuccessAlert(props) {
  return (
    <Alert variant="success">
      <Alert.Heading>{props.header}</Alert.Heading>
      <p>{props.alertText}</p>
      <div className="d-flex justify-content-end">
        <Button onClick={props.func} variant="success">
          Ok
        </Button>
      </div>
    </Alert>
  );
}

SuccessAlert.propTypes = {
  header: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  alertText: PropTypes.string,
};

export default SuccessAlert;
