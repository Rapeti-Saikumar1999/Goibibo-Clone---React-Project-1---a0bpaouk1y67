import "./Styles/BusCard.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContextProvider";
export default function BusCard({ details }) {
  const {
    name,
    source,
    destination,
    arrivalTime,
    departureTime,
    available,
    fare,
    seats,
    type,
    ratings,
    amenities,
    _id,
  } = details;

  const { isLoggedIn } = useAuth();

  const benifits = amenities.map((val) => val).join(" , ");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate(`/bus/booking/${_id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="BusCard">
      <div className="busCard-container">
        <h2 style={{ color: "red" }}>{name}</h2>
      </div>
      <div className="Bus-Booking-detals">
        <span>
          <p>{source}</p>
          <h3>{departureTime}</h3>
        </span>

        <span>
          <p>{destination}</p>
          <h3>{arrivalTime}</h3>
        </span>
        <span>
          <p>Available: {available ? "true" : "false"}</p>
          <h3>No of Seats: {seats}</h3>
        </span>
      </div>
      <div>
        <h3>Ticket Price: ₹{fare}</h3>
        <button onClick={handleClick}>SELECT SEAT</button>
      </div>
      <p>{_id}</p>
      <p className="bus-benifits">{benifits}</p>
    </div>
  );
}
