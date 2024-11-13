import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/a_logo.png";

function NavBar() {
  const navigate = useNavigate();

  const navToHome = () => {
    navigate("/");
  };

  const navToProducts = () => {
    navigate("/explore");
  };

  const navToAddProduct = () => {
    navigate("/addProduct");
  };

  const navToSellerProducts = () => {
    navigate("/sellerProducts");
  };

  const navToHistory = () => {
    navigate("/myHistory");
  };

  const navToActiveBids = () => {
    navigate("/activeBids");
  };

  function logout() {
    // Clear all items in localStorage
    localStorage.clear();
    navigate("/login");
  }

  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary ">
      <img src={logo} width="40" height="40" alt="logo" />
      <Navbar.Brand onClick={navToHome}>Auction House</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={navToProducts}>Explore</Nav.Link>
          <Nav>
            <NavDropdown title="My products" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={navToSellerProducts}>
                View my products
              </NavDropdown.Item>
              <NavDropdown.Item onClick={navToAddProduct}>
                Sell new product
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={navToActiveBids}>Active Bids</Nav.Link>
          </Nav>
        </Nav>
        <Nav>
          <Nav.Link onClick={navToHistory}>Purchase History</Nav.Link>
          <Nav.Link onClick={logout}>Log out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
