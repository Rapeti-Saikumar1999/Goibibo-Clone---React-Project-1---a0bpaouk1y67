import React from "react";
import "./Styles/HotelCard.css";
import { useNavigate } from "react-router-dom";
function HotelCard(props) {
  const { details } = props;
  console.log(details);
  const { image, name, location, _id, rating } = details;
  const navigate = useNavigate();
  return <div>{details.name}</div>;
}

export default HotelCard;
