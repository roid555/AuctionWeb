import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();

  function navToLoginPage() {
    if (localStorage.getItem("myToken") == null) {
      navigate("/login");
    }
    axios
      .get("user/validateToken", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then(() => navigate("/explore"))
      .catch(() => navigate("/login"));
  }

  function navToSignUpPage() {
    navigate("/signup");
  }

  return (
    <div className="home">
      <h1>Auction House</h1>
      <p>Welcome to the Auction House</p>
      <p>A place where anyone can sell anything and buy everything </p>
      <p>please procced by login to the website </p>
      <div className="home-btn-container">
        <button className="btns" onClick={navToLoginPage}>
          Login
        </button>
        <button className="btns" onClick={navToSignUpPage}>
          Sign-up
        </button>
      </div>
    </div>
  );
}

export default HomePage;
