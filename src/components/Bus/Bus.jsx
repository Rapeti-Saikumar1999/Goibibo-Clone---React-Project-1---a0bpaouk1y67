import "./Styles/Bus.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../Footer/Footer";
import BusBaneer1 from "../../Assets/Busbanner1.jpg";
export default function Bus() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [day, setDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      const day = selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      navigate(`/bus/search/${source}&${destination}`, {
        state: { source, destination, day },
      });
    } else {
      alert("Please provide day!!!");
    }
  };
  return (
    <>
      <div className="flight-search-bgc Bus">
        <div className="Bus-container">
          <h2 className="heading">Bus Ticket Booking</h2>
          <form onSubmit={handleSubmit}>
            <div className="journeyinfo">
              <input
                type="text"
                id="from"
                placeholder="Enter Source...(Hyderabad)"
                onChange={(e) => setSource(e.target.value)}
                value={source}
              />
              <input
                type="text"
                id="to"
                placeholder="Enter Destination....(Gujarat)"
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
              />
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                placeholderText="Select Date"
                className="datepicker"
              />
            </div>
            <div className="searchBus">
              <button type="submit">Search Bus</button>
            </div>
          </form>
        </div>

        <div className="busBanner">
          <img src={BusBaneer1} alt="" />
        </div>

        <div className="allState-bus-transports">
          <h2>Government Buses</h2>
          <div className="statebus-details">
            <section className="statebus">
              <img
                src="https://gos3.ibcdn.com/apsrtc_logo-1649928651.png"
                alt="apsrtc"
                width="50px"
              />
              <h3>APSRTC</h3>
              <p>Andhra Pradesh State Road Transport Corporation</p>
            </section>
            <section className="statebus">
              <img
                src="https://gos3.ibcdn.com/hrtc_logo-1649928862.png"
                alt="hrtc"
                width="50px"
              />
              <h3>HRTC</h3>
              <p>Himachal Road Transport Corporation</p>
            </section>
            <section className="statebus">
              <img
                src="https://gos3.ibcdn.com/ktc-1649929811.png"
                alt="ktc"
                width="50px"
              />
              <h3>KTC</h3>
              <p>Kadamba Transport Corporation</p>
            </section>
            <section className="statebus">
              <img
                src="https://gos3.ibcdn.com/msrtc_logo-1649928973.png"
                alt="msrtc"
                width="50px"
              />
              <h3>MSRTC</h3>
              <p>Maharashtra State Road Transport Corporation</p>
            </section>
            <section className="statebus">
              <img
                src="https://gos3.ibcdn.com/rsrtc_logo-1649929033.png"
                alt="rsrtc"
                width="50px"
              />
              <h3>RSRTC</h3>
              <p>Rajasthan State Road Transport Corporation</p>
            </section>
            <section className="statebus">
              <img
                src="https://gos3.ibcdn.com/sbstc-1649930682.png"
                alt="sbstc"
                width="50px"
              />
              <h3>SBSTC</h3>
              <p>South Bengal State Transport Corporation</p>
            </section>
            <section className="statebus">
              <img
                src="https://gos3.ibcdn.com/TSRTC-1649929129.png"
                alt="tsrtc"
                width="50px"
              />
              <h3>TSRTC</h3>
              <p>Telangana State Road Transport Corporation</p>
            </section>
            <section className="statebus">
              <img
                src="https://gos3.ibcdn.com/upsrtc-1649930806.png"
                alt="upsrtc"
                width="50px"
              />
              <h3>UPSRTC</h3>
              <p>Uttar Pradesh State Road Transport Corporation</p>
            </section>
            <section className="statebus">
              <img
                src="https://gos3.ibcdn.com/wbtc_logo-1649930411.png"
                alt="wbtc"
                width="50px"
              />
              <h3>WBTC</h3>
              <p>West Bengal Transport Corporation</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
