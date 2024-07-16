import React from "react";
import { useParams } from "react-router-dom";
import "./Styles/HotelDisplay.css";
function HotelDisplay() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default HotelDisplay;
