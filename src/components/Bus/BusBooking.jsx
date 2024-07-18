import "./Styles/BusBooking.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContextProvider";
export default function BusBooking() {
  const { _id } = useParams();
  const [bus, setBus] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // console.log(bus);

  function Seats() {
    const TotalSeats = [];
    for (let index = 0; index < bus.seats; index++) {
      TotalSeats.push(
        <div
          key={index + 1}
          className={
            bus.available
              ? selectedSeats[index]
                ? "selectedseat"
                : "availableseat"
              : "bookedseat"
          }
          onClick={(event) => handleSeatClick(index)}
        >
          {index + 1}
        </div>
      );
    }

    return TotalSeats;
  }

  const getBusData = async () => {
    const config = {
      headers: {
        projectId: "2qduaipfjxvu",
      },
    };

    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/bus/${_id}`,
        config
      );

      setBus(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBusData();
  });

  const handleSeatClick = (index, event) => {
    if (bus.available) {
      const newSelectedSeats = [...selectedSeats];
      console.log("seat", newSelectedSeats);
      newSelectedSeats[index] = !newSelectedSeats[index];
      setSelectedSeats(newSelectedSeats);
    }
  };

  console.log(selectedSeats);

  const handlebooking = async () => {
    const greySeatsCount = selectedSeats.filter((seat) => seat).length;
    if (isLoggedIn) {
      navigate("/bus/checkout", { state: { greySeatsCount, bus } });
    } else {
      navigate("/login");
    }
  };

  console.log(bus);

  return (
    <div className="bus-booking">
      <h1>{bus.name}</h1>

      <div className="busbooking-details">
        <div>
          <h2>Boarding Point</h2>
          <p>{bus.departureTime}</p>
          <p>{bus.source}</p>
        </div>
        <p>{"---->"}</p>
        <div>
          <h2>Dropping Point</h2>
          <p>{bus.arrivalTime}</p>
          <p>{bus.destination}</p>
        </div>
      </div>
      <div>
        {bus && (
          <div
            className="seats-container"
            style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}
          >
            {Seats()}
          </div>
        )}
        <div className="seat-details">
          <div style={{ display: "flex" }}>
            <span>Not Available</span>
            <img
              src="https://webkit.org/blog-files/color-gamut/Webkit-logo-P3.png"
              width="30px"
              height="30px"
              alt="red box"
            />
          </div>
          <div style={{ display: "flex" }}>
            <span>Available</span>
            <img
              src="https://www.clker.com/cliparts/b/e/c/3/131406375432193858green%20square.png"
              width="35px"
              height="35px"
              alt="green box"
            />
          </div>
          <div style={{ display: "flex" }}>
            <span>Selected by you</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Grey_Square.svg/2048px-Grey_Square.svg.png"
              width="35px"
              height="35px"
              alt="grey box"
            />
          </div>
          {bus.available && (
            <button type="submit" onClick={handlebooking}>
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
