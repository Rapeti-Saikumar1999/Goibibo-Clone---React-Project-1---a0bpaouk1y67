import React, { useState } from "react";
import "./Styles/Flights.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Flights() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      if (source && destination) {
        const day = new Date(selectedDate).toLocaleDateString("en-US", {
          weekday: "short",
        });
        navigate(`/flights/${source}&${destination}`, {
          state: { day, source, destination },
        });
      } else {
        alert("Enter valid Input!");
      }
    } else {
      alert("Enter Valid Input!");
    }
  };

  return (
    <div className="flights-container">
      <div className="flights">
        <h2>Book Domestic and International Flight Tickets</h2>
        <form action="" className="details" onSubmit={handleSubmit}>
          <div className="radio-buttons">
            <div div className="each-radio-button">
              <input type="radio" name="" id="" defaultChecked />
              <label> One-Way</label>
            </div>
            <div className="each-radio-button">
              <input type="radio" name="" id="Round-trip" checked={false} />
              <label style={{ cursor: "not-allowed" }}> Round-Trip</label>
            </div>
            <div
              className="each-radio-button"
              style={{ cursor: "not-allowed" }}
            >
              <input type="radio" name="" id="" checked={false} />
              <label style={{ cursor: "not-allowed" }}> Multi-City</label>
            </div>
          </div>

          <div className="journeyinfo">
            <input
              type="text"
              name=""
              id=""
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter Source...(HYD)"
            />
            <input
              type="text"
              name=""
              id=""
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter Destination...(BOM)"
            />

            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select Date"
              className="datepicker"
              minDate={new Date()}
            />
          </div>

          <div className="submit-form">
            <button type="submit">Search Flights</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Flights;
