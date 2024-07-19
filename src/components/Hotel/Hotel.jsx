import React, { useState } from "react";
import "./Styles/Hotel.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Hotelbanner1 from "../../Assets/HotelBanner1.jpg";
function Hotel() {
  const [Location, setLocation] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Location) {
      Navigate(`/hotels/search/${Location}`);
    } else {
      alert("Please Provide Location!");
    }
  };

  return (
    <div className="hotel-container">
      <div className="flight-search-bgc">
        <div className="search-banner">
          <div className="hotel">
            <h2>Book Hotels and HomeStays</h2>
            <form action="" onSubmit={handleSubmit}>
              <div className="trip-type">
                <div>
                  <input type="radio" name="" id="" defaultChecked />
                  <label> India</label>
                </div>
                <div>
                  <input type="radio" name="" id="" checked={false} />
                  <label style={{ cursor: "not-allowed" }}>
                    {" "}
                    International
                  </label>
                </div>
              </div>
              <div className="where">
                <label htmlFor="">Where</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter City Name"
                  style={{ textTransform: "uppercase" }}
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="check-in-out">
                <div className="check-in">
                  <label htmlFor="">Check In</label>
                  <input
                    type="date"
                    name=""
                    id=""
                    style={{ cursor: "not-allowed" }}
                    readOnly
                  />
                </div>
                <div className="check-out">
                  <label htmlFor="">Check Out</label>
                  <input
                    type="date"
                    name=""
                    id=""
                    style={{ cursor: "not-allowed" }}
                    readOnly
                  />
                </div>
              </div>

              <div className="guests-preferences">
                <div className="guests-rooms" style={{ cursor: "not-allowed" }}>
                  <label htmlFor="">Guests & Rooms</label>
                  <p>2 Adults | 1 Room</p>
                </div>

                <div className="preference" style={{ cursor: "not-allowed" }}>
                  <label htmlFor="">Traveller Preference</label>
                  <p>Couples | goStays</p>
                </div>
              </div>

              <button>Submit</button>
            </form>
          </div>
          <div>
            <img src={Hotelbanner1} alt="" />
          </div>
        </div>
      </div>
      <Footer />;
    </div>
  );
}

export default Hotel;
