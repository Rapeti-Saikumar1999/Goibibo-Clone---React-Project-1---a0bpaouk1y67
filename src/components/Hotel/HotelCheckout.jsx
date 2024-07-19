import React, { useEffect, useState } from "react";
import "./Styles/HotelCheckout.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../Footer/Footer";

function HotelCheckout() {
  const Navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const id = state.id;
  const roomDetails = state.room;
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Country, setCountry] = useState("");
  const [Type, setType] = useState("");

  const [Hotel, setHotel] = useState({ images: [] });
  const total = roomDetails.price + 1678;

  const [loading, setLoading] = useState(false);
  const fetchHotelData = async () => {
    const config = {
      headers: {
        projectId: "2qduaipfjxvu",
      },
    };

    const url =
      "https://academics.newtonschool.co/api/v1/bookingportals/hotel/";

    try {
      setLoading(true);
      const res = await axios.get(`${url}${id}`, config);
      setHotel(res.data.data);
      setLoading(false);

      console.log(res);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  const Handlesubmit = (e) => {
    e.preventDefault();
    if (FirstName && LastName && Email && PhoneNo && Country && Type) {
      Navigate("/hotels/payment", {
        state: {
          Hotel,
          FirstName,
          LastName,
          PhoneNo,
          Country,
          Email,
          Type,
          roomDetails,
          total,
        },
      });
    } else {
      alert("Please provide all details!");
    }
  };

  return (
    <div>
      <div className="hotel-checkout">
        <h3>HOTEL INFO</h3>
        <div className="hotel-checkout-info">
          <div className="hotel-checkout-image">
            <img src={Hotel.images[0]} alt="" width={500} height={300} />
          </div>
          <div className="hotel-checkout-details">
            <div>
              <h2>{Hotel.name}</h2>
              <p>{Hotel.location}</p>
              <p>Rating: {Hotel.rating}/5</p>
            </div>
            <div>
              <h2>Room Details</h2>
              <div>
                <p>Room Number: {roomDetails.roomNumber}</p>
                <p>Room Type: {roomDetails.roomType}</p>
                <p>Room Size{roomDetails.roomSize}</p>
                <p>Price: ₹{roomDetails.price}</p>
              </div>
              <div>
                <p>{roomDetails.bedDetail}</p>
                <p>{roomDetails.cancellationPolicy}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="total-price">
          <h2>FARE SUMMARY</h2>
          <div className="grand-total">
            <p>Base fare</p>
            <h3>₹{roomDetails.price}</h3>
          </div>
          <div className="grand-total">
            <p>Taxes and Surcharges</p>
            <h3>₹1678</h3>
          </div>
          <div className="grand-total">
            <h2>Grand Total</h2>
            <h3>₹{total}</h3>
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
      </div>
      <Footer />;
    </div>
  );
}

export default HotelCheckout;
