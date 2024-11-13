import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import FloatLabelBtn from "../../components/floatLabelBtn/FloatLabelBtn";
import ErrorAlert from "../../components/alerts/ErrorAlert";

/*
  Login page for users
*/
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [showAlert, setShowAlert] = useState(true);

  const handleSignUp = () => {
    navigate("/signUp");
  };

  const sendLoginRequest = (e) => {
    e.preventDefault();
    setShowAlert(true);
    const body = { email, password };
    axios
      .post("login", body)
      .then((response) => {
        localStorage.setItem("myEmail", email);
        localStorage.setItem("myToken", response.data);
        setErrorCode(null);
        navigate("/explore");
      })
      .catch((error) => {
        setErrorCode(error.response.status);
      });
  };

  const onOk = () => {
    setShowAlert(false);
    setErrorCode(null);
  };

  if (errorCode !== null) {
    return (
      <ErrorAlert
        header="One of the details incorrect"
        alertText="Please try again"
        func={onOk}
        show={showAlert}
      />
    );
  }

  return (
    <form className="login-form">
      <h1>Login Page</h1>
      <div className="input-container">
        <FloatLabelBtn
          type="email"
          required
          value={email}
          labelName="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FloatLabelBtn
          type="password"
          required
          value={password}
          labelName="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="btn-container">
        <button className="login-btn" onClick={sendLoginRequest}>
          Login
        </button>
        <button className="sign-up-btn" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
