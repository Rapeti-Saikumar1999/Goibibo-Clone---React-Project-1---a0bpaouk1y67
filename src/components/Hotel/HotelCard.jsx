import React from "react";
import "./Styles/HotelCard.css";
import { useNavigate } from "react-router-dom";
function HotelCard(props) {
  const { details } = props;
  const { images, name, location, _id, rating, amenities } = details;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/hotels/display/${_id}`);
  };
  return (
    <div className="HotelCard" onClick={handleClick}>
      <div className="hotelImage">
        <img src={images[0]} alt="" />
      </div>
      <div className="hotelInfo">
        <h2>{name}</h2>
        <h3>{location}</h3>
        <h4>Rating: {rating}/5</h4>
      </div>
    </div>
  );
}

export default HotelCard;
