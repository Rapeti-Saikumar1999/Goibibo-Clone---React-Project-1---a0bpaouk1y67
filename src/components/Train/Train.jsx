import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../Footer/Footer";
import TrainBanner1 from "../../Assets/TrainBanner1.jpg";
import "./Styles/Train.css";
export default function Train() {
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
      navigate(`/trains/search/${source}&${destination}`, {
        state: { source, destination, day },
      });
    } else {
      alert("Please Provide day!");
    }
  };
  return (
    <div>
      <div className="flight-search-bgc">
        <div className="goibibo"></div>
        <div className="Trains">
          <h2 className="Trains-heading" style={{ color: "white" }}>
            Train Ticket Booking
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="radio-button">
              <div>
                <input type="radio" id="book" defaultChecked />
                <label htmlFor="book">Book Train tickets</label>
              </div>
              <div style={{ cursor: "not-allowed" }}>
                <input type="radio" id="pnr" checked={false} />
                <label htmlFor="pnr">Check PNR Status</label>
              </div>
              <div style={{ cursor: "not-allowed" }}>
                <input type="radio" id="live" checked={false} />
                <label htmlFor="live">Live Trains Status</label>
              </div>
            </div>

            <div className="journey-info">
              <input
                type="text"
                id="from"
                placeholder="Enter Source...(secunderabad)"
                onChange={(e) => setSource(e.target.value)}
                value={source}
              />
              <input
                type="text"
                id="to"
                placeholder="Enter Destination...(varanasi)"
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

            <button type="submit" className="train-search-btn">
              Search Trains
            </button>
          </form>

          <img src={TrainBanner1} alt="" className="train-banner" />

          <div className="Promises-guarantees">
            <main className="train-container">
              <h1>1 million+ customers</h1>
              <p>book train tickets with us because</p>
            </main>
            <section className="train-container-images">
              <div>
                <img
                  src="https://gos3.ibcdn.com/no_can_fee-1668596842.svg"
                  alt="benefits icon"
                  width="60"
                  height="60"
                />
                <span>
                  <h2>No Cancellation Fee</h2>
                  <p>You can opt for free cancellation & get full refund.</p>
                </span>
              </div>
              <div>
                <img
                  src="https://gos3.ibcdn.com/go_cnfrm-1668596688.svg"
                  alt="benefits icon"
                  width="60"
                  height="60"
                />
                <span>
                  <h2>goConfirmed Trip</h2>
                  <p>Guaranteed confirmed tickets or we give you 2x refund.</p>
                </span>
              </div>
              <div>
                <img
                  src="https://gos3.ibcdn.com/no_pg_fee_icon-1673341757.png"
                  alt="benefits icon"
                  width="60"
                  height="60"
                />
                <span>
                  <h2>No PG Fee via UPI</h2>
                  <p>Zero Payment Gateway Charges via UPI mode</p>
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
