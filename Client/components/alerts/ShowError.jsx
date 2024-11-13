import PropTypes from "prop-types";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import { useNavigate } from "react-router-dom";

function ShowError(props) {
  const navigate = useNavigate();

  if (props.code == 401) {
    return (
      <ErrorAlert
        header="Token invalid"
        alertText="Please login again"
        func={() => navigate("/login")}
      />
    );
  }
  if (props.code == 208) {
    return (
      <SuccessAlert
        header="Registration Complete"
        func={() => navigate("/login")}
      />
    );
  }

  return (
    <ErrorAlert
      header="Server Error"
      alertText="Please come back later"
      func={() => navigate("/login")}
    />
  );
}

ShowError.propTypes = {
  code: PropTypes.number.isRequired,
};
export default ShowError;
