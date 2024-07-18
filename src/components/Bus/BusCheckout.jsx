import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function BusCheckout() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Country, setCountry] = useState("");
  const [Type, setType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  console.log(state.bus);
  const bus = state.bus;

  const Handlesubmit = (e) => {
    e.preventDefault();
    if (FirstName && LastName && Country && Email && PhoneNo) {
      navigate("/bus/payment", {
        state: { bus, FirstName, LastName, Email, PhoneNo, Type },
      });
    } else {
      alert("Please provide all details!");
    }
  };

  let farePrie = state.greySeatsCount * state.bus.fare;
  let tax = state.greySeatsCount * 78;
  let totalPrice = tax + farePrie;

  return (
    <div className="bus-checkout-container">
      <div className="flight-checkout-container bus-checkout">
        <section className="bus-checkout-info">
          <h2>BUS INFO</h2>
          <div>
            <h1 style={{ color: "red" }}>{state.bus.name}</h1>
            <p>{state.bus.type}</p>
          </div>
          <div className="flightbookindetails trainbookingdetails">
            <span>
              <p style={{ color: "grey" }}>SOURCE: {state.bus.source}</p>
              <h3>Depature Time: {state.bus.departureTime}</h3>
            </span>
            <span></span>
            <span>
              <p style={{ color: "grey" }}>
                Destination: {state.bus.destination}
              </p>
              <h3>Arrival Time: {state.bus.arrivalTime}</h3>
            </span>
          </div>
        </section>
        <section className="flight-price-details checkoutPrice">
          <h1>FARE SUMMARY</h1>
          <span className="grand-total">
            <p>Base fare</p>
            <h3>₹{farePrie}</h3>
          </span>
          <span className="grand-total">
            <p>Taxes and Surcharges</p>
            <h3>₹{tax}</h3>
          </span>
          <span style={{ color: "#2176d1" }} className="grand-total">
            <h2>Grand Total</h2>
            <h3>₹{totalPrice}</h3>
          </span>
        </section>
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
    </div>
  );
}
