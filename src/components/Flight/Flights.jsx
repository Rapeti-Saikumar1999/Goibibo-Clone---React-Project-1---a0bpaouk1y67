import React, { useState } from "react";
import "./Styles/Flights.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../Footer/Footer";
import Banner1 from "../../Assets/flightBanner1.jpg";
import Banner2 from "../../Assets/flightBanner2.jpg";
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
      <div className="flights-bgColor">
        <div className="flights">
          <h2>Domestic and International Flights</h2>
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
                placeholder="Enter Destination...(DEL)"
              />

              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Select Date"
                className="datepicker"
                minDate={new Date()}
              />

              <input
                type="text"
                name=""
                id=""
                placeholder="Travellers&Class"
                style={{ cursor: "not-allowed" }}
                disabled
              />
            </div>

            <div className="submit-form">
              <button type="submit">Search Flights</button>
            </div>
          </form>
        </div>

        <div className="flightBanner1">
          <img src={Banner1} alt="" />
        </div>

        {/* <div className="flightsOffer"></div> */}
        <div className="flightBanner1">
          <img src={Banner2} alt="" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Flights;
