import React from "react";
import "./Styles/FlightCard.css";
import { useAuth } from "../../Auth/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function FlightCard(props) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const { details, flightId } = props;
  // console.log(details,flightId);
  
  // sessionStorage.setItem("flightDetails", JSON.stringify(details));

  const {
    flightID,
    amenities,
    arrivalTime,
    departureTime,
    destination,
    duration,
    source,
    stops,
    ticketPrice,
  } = details;
  const benifits = amenities.map((val) => val).join(", ");



  const handleClick = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      // try {
      //   const token = sessionStorage.getItem("userToken");
     

      //   const config = {
      //     headers: {
      //       projectId: "2qduaipfjxvu",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   };

      //   const reqBody = {
      //     bookingType: "flight",
      //     bookingDetails: {
      //       flightId: flightId,
      //     },
      //     appType: "bookingportals",
      //   };

      //   const res = await axios.post(
      //     "https://academics.newtonschool.co/api/v1/bookingportals/booking",
      //     reqBody,
      //     config
      //   );
      //   const bookingId = res.data.booking._id;
      //   if (bookingId) {
      //     sessionStorage.setItem("bookingId", bookingId);
      //     sessionStorage.setItem(
      //       "userId",
      //       JSON.stringify(res.data.booking.user)
      //     );
      //   }

      //     navigate("/flights/checkout",{state:{details}});
       
      // } catch (error) {
      //   alert(error.message);
      // }

      navigate("/flights/checkout",{state:{details}})
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="flight">
      <div className="flight-id">
        <h3>{flightID}</h3>
      </div>
      <div className="flight-booking-details">
        <div>
          <p>SOURCE: {source}</p>
          <h4>Departure Time: {departureTime}</h4>
        </div>
        <div>
          <p>DURATION: {duration}</p>
          <h4>No of stops: {stops}</h4>
        </div>
        <div>
          <p>DESTINATION: {destination}</p>
          <h4>Arrival time: {arrivalTime}</h4>
        </div>
      </div>
      <div className="ticket-price">
        <h3>Ticket price : {ticketPrice}</h3>
      </div>
      <div className="benifits">
        <p>{benifits}</p>
      </div>
      <button onClick={(e) => handleClick(e)}>Book Now</button>
    </div>
  );
}

export default FlightCard;
