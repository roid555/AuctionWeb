import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import ShowError from "../alerts/ShowError";

const PrivateRoute = ({ element: Element }) => {
  const [isTokenValid, setIsTokenValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const valid = await authToken();
      setIsTokenValid(valid);
    };
    checkToken();
  }, []);

  const authToken = async () => {
    if (localStorage.getItem("myToken") == null) {
      return false;
    }
    try {
      const response = await axios.get("user/validateToken", {
        headers: { Authorization: `Bearer ${localStorage.getItem("myToken")}` },
      });
      return response.status == 200;
    } catch (e) {
      console.error("Token validation failed");
      return false;
    }
  };

  // Show a loading state while determining token validity
  if (isTokenValid === null) {
    return <div>Loading...</div>;
  }

  if (isTokenValid) {
    return <Element />;
  } else {
    return <ShowError code={401} />;
  }
};

// Define prop types for the component
PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
