import React, { useEffect, useState } from "react";
import axios from "axios";
import "../MyTrips/MyTrips.css";

function MyTrips() {
  const [Trips, setTrips] = useState();
  const fetchMyTrips = async () => {
    const token = sessionStorage.getItem("userToken");
    const config = {
      headers: {
        projectId: "a0bpaouk1y67",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get(
        "https://academics.newtonschool.co/api/v1/bookingportals/booking",
        config
      );
      setTrips(res.data.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchMyTrips();
  }, []);

  return (
    <div className="My-Trips">
      <div className="heading">
        <h3>My Trips</h3>
      </div>
      <div className="Trips-List">
        {Trips &&
          Trips.map((trip) => {
            const formattedDate = new Date(
              trip.created_at
            ).toLocaleDateString();
            const formattedTime = new Date(
              trip.created_at
            ).toLocaleTimeString();

            return (
              <div>
                <div className="tripsdata">
                  {trip.booking_type === "hotel" && (
                    <>
                      <p>{trip.hotel.name}</p>
                      <p>{trip.hotel.location}</p>
                    </>
                  )}
                  {trip.booking_type === "flight" && (
                    <>
                      <p>{trip.flight.source}</p> ---
                      <p>{trip.flight.destination}</p>
                    </>
                  )}
                  {trip.booking_type === "train" && (
                    <>
                      <p>{trip.train.trainNumber}</p>
                      <p>{trip.train.trainName}</p>
                    </>
                  )}
                  {trip.booking_type === "bus" && (
                    <>
                      <p>{trip.bus.name}</p>
                      <p>{trip.bus.source}</p>
                      <p>{trip.bus.destination}</p>
                    </>
                  )}
                  <p>{trip.booking_type}</p>
                  <p>
                    {formattedDate} {formattedTime}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MyTrips;
