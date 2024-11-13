import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./pages/loginForm/LoginForm";
import SignUpPage from "./pages/signUp/SignUpPage";
import HomePage from "./pages/homePage/HomePage";
import AddProduct from "./pages/addProduct/AddProduct";
import axios from "axios";
import NavBar from "./components/navBar/NavBar";
import SellerProducts from "./pages/sellerProducts/SellerProducts";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import PurchaseHistory from "./pages/history/PurchaseHistory";
import ExplorePage from "./pages/productsPage/ExplorePage";
import ActiveBids from "./pages/activeBids/ActiveBids";
import { ToastContainer } from "react-toastify";

function App() {
  axios.defaults.baseURL = "http://localhost:8080/api/";
  document.title = "Auction House";
  return (
    <>
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="content">
        <Router>
          <NavBar />
          <ToastContainer position="top-right" />

          <Routes>
            {/* <Route path="/test" element={<NavBar />} /> */}
            <Route
              path="/sellerProducts"
              element={<PrivateRoute element={SellerProducts} />}
            />
            <Route
              path="/explore"
              element={<PrivateRoute element={ExplorePage} />}
            />
            <Route
              path="/addProduct"
              element={<PrivateRoute element={AddProduct} />}
            />
            <Route
              path="/activeBids"
              element={<PrivateRoute element={ActiveBids} />}
            />
            <Route
              path="/myHistory"
              element={<PrivateRoute element={PurchaseHistory} />}
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
