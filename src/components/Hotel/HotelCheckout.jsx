import React, { useEffect, useState } from "react";
import "./Styles/HotelCheckout.css";
import { useParams } from "react-router-dom";
import axios from "axios";
function HotelCheckout() {
  const { id } = useParams();
  const [Hotel, setHotel] = useState();
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
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  return <div className="hotel-checkout"></div>;
}

export default HotelCheckout;
