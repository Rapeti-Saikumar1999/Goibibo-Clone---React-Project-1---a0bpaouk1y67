import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContextProvider";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import HotelIcon from "@mui/icons-material/Hotel";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { HelpOutline } from "@mui/icons-material";
import flight from "../../Assets/plane.png";
import bus from "../../Assets/bus.png";
import hotel from "../../Assets/hotel.png";
import train from "../../Assets/train.png";
import manage from "../../Assets/manage.png";
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
            {/* <FlightOutlinedIcon color="primary" /> */}
            <img src={flight} alt="" style={{ width: "50px" }} />
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
            <img src={hotel} alt="" style={{ width: "40px" }} />
            {/* <HotelIcon color="primary" /> */}
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
            <img src={train} alt="" style={{ width: "50px" }} />
            {/* <TrainIcon color="primary" /> */}
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
            <img src={bus} alt="" style={{ width: "50px" }} />
            {/* <DirectionsBusIcon color="primary" /> */}
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
          <div className="manageTrips">
            <div>
              <img src={manage} alt="" style={{ width: "30px" }} />
            </div>
            <div>
              <p className="mytrips">MyTrips</p>
              <p style={{ color: "black", fontSize: "14px" }}>
                Manage Bookings
              </p>

              {Menu === "mytrips" && <hr />}
            </div>
          </div>
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
