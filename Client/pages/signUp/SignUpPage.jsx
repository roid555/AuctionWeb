import { useState } from "react";
import axios from "axios";
import "./SignUpPage.css";
import FloatLabelBtn from "../../components/floatLabelBtn/FloatLabelBtn";
import ShowError from "../../components/alerts/ShowError";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

/*
  Sign up page for new users 
*/

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { firstName, lastName, email, password };

    axios
      .post("/registration", newUser)
      .then(() => {
        toast.success("registration succeed!!");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status == 409) {
          toast.error("Email taken!!");
        } else {
          setErrorCode(500);
        }
      });
  };

  if (errorCode !== null) {
    return <ShowError code={errorCode} />;
  }

  return (
    <form className="sign-up-page" onSubmit={(e) => handleSubmit(e)}>
      <h1>Sign Up</h1>
      <div className="input-container">
        <FloatLabelBtn
          type="text"
          required
          value={firstName}
          labelName="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FloatLabelBtn
          type="text"
          required
          value={lastName}
          labelName="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
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
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignUpPage;
