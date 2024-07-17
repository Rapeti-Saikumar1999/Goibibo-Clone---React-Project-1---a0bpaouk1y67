import { Phone } from "@mui/icons-material";
import "./Styles/TrainCheckout.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function TrainCheckout() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Country, setCountry] = useState("");
  const [Type, setType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const trainId = state.trainId;
  const details = state.details;

  const Handlesubmit = (e) => {
    e.preventDefault();
    if (FirstName && LastName && Country && Email && Phone) {
      navigate("/trains/payment", {
        state: {
          trainId,
          details,
          totalPrice,
          FirstName,
          LastName,
          Email,
          PhoneNo,
          Country,
          Type,
          totalPrice,
        },
      });
    } else {
      alert("Please provide all details");
    }
  };
  let totalPrice = 1678 + state.details.fare;

  return (
    <div className="train-checkout-container">
      <div className="">
        <section>
          <h2>TRAIN INFO</h2>
          <div>
            <p>{state.details.trainName}</p>
            <h4>{state.details.trainNumber}</h4>
          </div>
          <div>
            <span>
              <p>SOURCE: {state.details.source}</p>
              <h3>Depature Time: {state.details.departureTime}</h3>
            </span>
            <span>
              <p>Duration: {state.details.travelDuration}</p>
              <p>--------------</p>
            </span>
            <span>
              <p>Destination: {state.details.destination}</p>
              <h3>Arrival Time: {state.details.arrivalTime}</h3>
            </span>
          </div>
          <p>Baggage -7 Kgs (1 piece only) Cabin</p>
        </section>

        <section className="train-price-details">
          <h1>FARE SUMMARY</h1>
          <span className="grand-total">
            <p>Base fare</p>
            <h3>₹{state.details.fare}</h3>
          </span>
          <span className="grand-total">
            <p>Taxes and Surcharges</p>
            <h3>₹1678</h3>
          </span>
          <span className="grand-total">
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

      {/* {modalOpen && (
        <TrainPayment
          details={details}
          total={totalPrice}
          closeModal={() => setModalOpen(false)}
          
        />
      )} */}
    </div>
  );
}
