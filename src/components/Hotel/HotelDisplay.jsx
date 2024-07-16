import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Styles/HotelDisplay.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContextProvider";
function HotelDisplay() {
  const { id } = useParams();
  const [Hotels, setHotels] = useState({ images: [] });
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

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
      console.log(res);
      setHotels(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  useEffect(() => {
    fetchHotelData();
  }, [currentIndex]);

  function handleClickPre() {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? Hotels.images.length - 1 : currentIndex - 1
    );
  }

  function handleClickNext() {
    setCurrentIndex((currentIndex) =>
      currentIndex === Hotels.images.length - 1 ? 0 : currentIndex + 1
    );
  }

  function handleBook(room, e) {
    e.preventDefault();
    if (isLoggedIn) {
      navigate(`/hotels/checkout`, { state: { id, room } });
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="Display-hotel">
      <div className="Slide-Show">
        <div className="slide-images">
          <button className="prev" onClick={handleClickPre}>
            &#10094;
          </button>
          <img
            className="image"
            src={Hotels.images[currentIndex]}
            alt="hotelImage"
          />
          <button className="next" onClick={handleClickNext}>
            &#10095;
          </button>
        </div>
        <div className="hotel-display-info">
          <h1 className="hotelTitle">{Hotels.name}</h1>
          <p className="hotelLocation">{Hotels.location}</p>
          <p className="hotelRating">Rating: {Hotels.rating}</p>
          <p className="hotelAmenities">
            Special Benefits: {Hotels.amenities && Hotels.amenities.join(" , ")}
          </p>
        </div>
      </div>
      <div className="room-container">
        {Hotels.rooms &&
          Hotels.rooms.map((room) => {
            return (
              <div className="room-details" key={room._id}>
                <p>{room.roomNumber}</p>
                <p>{room.roomType}</p>
                <p>₹{room.price}</p>
                <p>{room.bedDetails}</p>
                <button onClick={(e) => handleBook(room, e)}>Book Now</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default HotelDisplay;
