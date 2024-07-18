import "./Styles/BusBooking.css";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContextProvider";
export default function BusBooking() {
  const { _id } = useParams();
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
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

    getBusData();
  }, [_id]);

  const handleSeatClick = (index, event) => {
    if (bus.available) {
      const newSelectedSeats = [...selectedSeats];
      newSelectedSeats[index] = !newSelectedSeats[index];
      setSelectedSeats(newSelectedSeats);
      const seatElement = event.target;
      seatElement.classList.toggle("selectedseat");
    }
  };

  const handlebooking = async () => {
    const greySeatsCount = selectedSeats.filter((seat) => seat).length;
    sessionStorage.setItem("selectedSeats", greySeatsCount);
    if (isLoggedIn) {
      try {
        const token = sessionStorage.getItem("userToken");

        const config = {
          headers: {
            projectId: "9sa80czkq1na",
            Authorization: `Bearer ${token}`,
          },
        };

        const requestBody = {
          bookingType: "bus",
          bookingDetails: {
            busId: _id,
          },
        };

        const res = await axios.post(
          "https://academics.newtonschool.co/api/v1/bookingportals/booking",
          { ...requestBody, appType: "bookingportals" },
          config
        );

        const bookingId = res.data.bookingId?._id;
        if (bookingId) {
          sessionStorage.setItem("bookingId", bookingId);
          sessionStorage.setItem(
            "userId",
            JSON.stringify(res.data.bookingId.user)
          );
          navigate("/bus/checkout");
        }
      } catch (err) {
        console.error("Error:", err);
      }
      navigate("/bus/checkout");
    } else {
      navigate("/login", { state: { prevPath: "/bus/checkout" } });
    }
  };

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
          <div className="seat-container">
            {Array.from({ length: bus.seats }, (_, index) => (
              <div
                key={index + 1}
                className={
                  bus.available
                    ? selectedSeats[index]
                      ? "selectedseat"
                      : "availableseat"
                    : "bookedseat"
                }
                onClick={(event) => handleSeatClick(index, event)}
              >
                {index + 1}
              </div>
            ))}
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
            <button
              type="submit"
              className="busbooking-button"
              onClick={handlebooking}
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
