import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function ErrorAlert(props) {
  return (
    <Alert show={props.show} variant="danger">
      <Alert.Heading>{props.header}</Alert.Heading>
      <p>{props.alertText}</p>
      <div className="d-flex justify-content-end">
        <Button onClick={props.func} variant="danger">
          Ok
        </Button>
      </div>
    </Alert>
  );
}
ErrorAlert.propTypes = {
  header: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  alertText: PropTypes.string,
  show: PropTypes.bool,
};
export default ErrorAlert;
