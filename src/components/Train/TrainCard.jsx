import React from "react";
import "./Styles/TrainCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContextProvider";
import axios from "axios";

export default function TrainCard({ details, trainId }) {
  const {
    trainType,
    trainNumber,
    trainName,
    destination,
    source,
    arrivalTime,
    departureTime,
    fare,
    travelDuration,
    daysOfOperation,
    coaches,
    availableSeats,
  } = details;

  const days = daysOfOperation
    .map((day) => day.slice(0, 1).toUpperCase())
    .join("  ");

  sessionStorage.setItem("trainDetails", JSON.stringify(details));
  console.log(details);
  const [currentCoachIndex, setCurrentCoachIndex] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const coachesInfo = coaches.map((coach, index) => (
    <div
      key={index}
      onClick={() => handleBookNow(coach)}
      style={{ cursor: "pointer" }}
      className="coach-info"
    >
      <p style={{ fontWeight: "600" }}>
        <span>{coach.coachType}</span> <span>₹{fare}</span>
      </p>
      <p style={{ color: "darkgreen" }}>AVL {coach.numberOfSeats}</p>
    </div>
  ));

  const handlePrevClick = () => {
    setCurrentCoachIndex((prevIndex) =>
      prevIndex === 0 ? coaches.length - 3 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentCoachIndex((prevIndex) =>
      prevIndex === coaches.length - 3 ? 0 : prevIndex + 1
    );
  };

  const handleBookNow = async (coach) => {
    if (isLoggedIn) {
      navigate("/trains/checkout", { state: { details, trainId } });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="train-card">
      <div className="trainheading">
        <h2>
          {trainNumber} {trainName}({trainType})
        </h2>
        <p>Runs on: {days}</p>
      </div>
      <section className="trainheading">
        <h3>
          {departureTime} {source}
        </h3>
        <p>--{travelDuration}--</p>
        <h3>
          {arrivalTime} {destination}
        </h3>
      </section>
      <div className="train-info">
        <div className="train-coach">
          <button onClick={handlePrevClick} className="train-coach-button">
            &#10094;
          </button>
          {coachesInfo.slice(currentCoachIndex, currentCoachIndex + 3)}
          <button onClick={handleNextClick} className="train-coach-button">
            &#10095;
          </button>
        </div>
        <p id="train-available-seats" style={{ color: "orange" }}>
          Available Seats: {availableSeats}
        </p>
      </div>
    </div>
  );
}
