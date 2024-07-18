import React, { useState } from "react";
import "./Styles/FlightCheckout.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";

function FlightCheckout() {
  const loc = useLocation();
  const state = loc.state;

  const details = state.details;
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Country, setCountry] = useState("");
  const [Type, setType] = useState("");
  const Navigate = useNavigate();

  const Handlesubmit = (e) => {
    e.preventDefault();
    if (FirstName && LastName && Email && PhoneNo && Country && Type) {
      Navigate("/flights/payment", {
        state: { details, FirstName, LastName, PhoneNo, Country, Email, Type },
      });
    } else {
      alert("Please provide all details!");
    }
  };

  return (
    <div className="checkout-container">
      <h3>Review your booking</h3>
      <div className="checkout-flight">
        <p>{details.airline}</p>
        <h4>{details.flightID}</h4>
      </div>
      <div className="flight-checkout-booking-details">
        <div className="flight-info">
          <div className="flight-info-SandD">
            <div>
              <p>{details.source}</p>
              <h4>{details.departureTime}</h4>
            </div>
            <div>
              <p>Duration: {details.duration}</p>
              <h4>Stops: {details.stops}</h4>
            </div>
            <div>
              <p>{details.destination}</p>
              <h4>{details.arrivalTime}</h4>
            </div>
          </div>
          <p>Baggage -7 Kgs (1 piece only) Cabin</p>
        </div>
        <div className="flight-ticket-price-info">
          <h2>FARE SUMMARY</h2>
          <div>
            <p>Base fare</p>
            <h3>₹{details.ticketPrice}</h3>
          </div>
          <div>
            <p>Taxes and Surcharges</p>
            <h3>₹1678</h3>
          </div>
          <div>
            <p>Grand Total</p>
            <h3>₹{details.ticketPrice + 1678}</h3>
          </div>
        </div>
      </div>

      <div className="checkout-info">
        <h2>GUEST DETAILS</h2>
        <form action="" onSubmit={(e) => Handlesubmit(e)}>
          <div>
            <label htmlFor="">Title</label>
            <select name="title" onChange={(e) => setType(e.target.value)}>
              <option value="select">select</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
            </select>
          </div>
          <div>
            <label htmlFor="">First Name</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Country</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Your Country"
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Email Address</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Phone Number</label>
            <input
              type="tel"
              name=""
              id=""
              placeholder="Enter Phone Number"
              value={PhoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          <button type="submit">proceed to payment</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default FlightCheckout;
