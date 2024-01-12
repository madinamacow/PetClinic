import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "../../Styles/Navigation.css";
import { Link } from "react-router-dom";
// import Footer from "../Navigation/Footer";
import { useContext } from "react";
import { PetDataContext } from "../../Services/FetchPetsComponent";
import { Button } from "@mui/material";

export default function Navigation() {
    const { setIsLoggedin, userRole } = useContext(PetDataContext);

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("respoving-navbar");
  };

  const signOut = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Clear user data
    setIsLoggedin(false);
    window.location.href = "/";
  };

  return (
    <>
      <header>
        <h3>VetClinic</h3>
        <nav ref={navRef} style={{ marginLeft: '20rem'}}>
          {userRole === "pet_owner" && <Link to="/PetClinic">Home</Link>}
          {userRole === "doctor" && <Link to="/Dashboard">Home</Link>}
          <Link to="/Visits">
            <Button color="inherit">Appointment</Button>
          </Link>
          {userRole === "pet_owner" && (
            <Link to="/addpet">
              <Button color="inherit">Add pet</Button>
            </Link>
          )}
          <Link to="/" onClick={signOut}>
            Logout
          </Link>

          <button className="nav-btn nav-close" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button onClick={showNavbar} className="nav-btn">
          <FaBars />
        </button>
      </header>
      
    </>
  );
}
