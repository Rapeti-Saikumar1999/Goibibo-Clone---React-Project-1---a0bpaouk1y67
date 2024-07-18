import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContextProvider";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import HotelIcon from "@mui/icons-material/Hotel";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { HelpOutline } from "@mui/icons-material";
function NavBar() {
  const [Menu, setMenu] = useState("flight");
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <div className="nav-container">
      <NavLink
        onClick={() => setMenu("flight")}
        to="/"
        style={{ textDecoration: "none" }}
      >
        <p className="logo">
          go<span>ibibo</span>
        </p>
      </NavLink>
      <div className="navbar">
        <NavLink
          onClick={() => setMenu("flight")}
          className="navlink"
          to="/"
          style={{ textDecoration: "none" }}
        >
          <div className="nav-box">
            <FlightOutlinedIcon color="primary" />
            Flights
          </div>
          {Menu === "flight" && <hr />}
        </NavLink>
        <NavLink
          onClick={() => setMenu("hotels")}
          className="navlink"
          to="/hotels"
          style={{ textDecoration: "none" }}
        >
          <div className="nav-box">
            <HotelIcon color="primary" />
            Hotels
          </div>
          {Menu === "hotels" && <hr />}
        </NavLink>
        <NavLink
          onClick={() => setMenu("trains")}
          className="navlink"
          to="/trains"
          style={{ textDecoration: "none" }}
        >
          <div className="nav-box">
            <TrainIcon color="primary" />
            Trains
          </div>
          {Menu === "trains" && <hr />}
        </NavLink>
        <NavLink
          onClick={() => setMenu("bus")}
          className="navlink"
          to="/bus"
          style={{ textDecoration: "none" }}
        >
          <div className="nav-box">
            <DirectionsBusIcon color="primary" />
            Bus
          </div>
          {Menu === "bus" && <hr />}
        </NavLink>
        <NavLink
          onClick={() => setMenu("mytrips")}
          className="navlink mytrips-history-btn"
          to="/mytrips"
          style={{ textDecoration: "none" }}
        >
          <p className="mytrips">MyTrips</p>
          <p>Manage Bookings</p>
          {Menu === "mytrips" && <hr />}
        </NavLink>
      </div>

      <div className="profile">
        {isLoggedIn ? (
          <NavLink
            to="/"
            onClick={() => {
              sessionStorage.clear();
              setIsLoggedIn(false);
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            Logout
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            style={{ textDecoration: "none", color: "black" }}
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;
