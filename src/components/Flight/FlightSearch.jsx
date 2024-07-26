import React, { useEffect, useState } from "react";
import "./Styles/FlightSearch.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FlightCard from "./FlightCard";
import Footer from "../Footer/Footer";
function FlightSearch() {
  const [Loading, setLoading] = useState(false);
  const [SelectedDate, setSelectedDate] = useState(null);
  const location = useLocation();
  const state = location.state;
  const [source, setSource] = useState(state.source);
  const [destination, setDestination] = useState(state.destination);
  const [day, setDay] = useState(state.day);
  const [flightsList, setFlightsList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    stops: null,
    departure: null,
    sortPrice: false,
    sortDuration: false,
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value,
    });
  };

  const handleFilterChange1 = (filterType, value, e) => {
    e.preventDefault();
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value,
    });
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      stops: null,
      departure: null,
      sortPrice: false,
      sortDuration: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (SelectedDate) {
      const day = new Date(SelectedDate).toLocaleDateString("en-US", {
        weekday: "short",
      });
      setDay(day);
    } else {
      alert("Please select date");
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}`,

        {
          headers: {
            projectId: "a0bpaouk1y67",
          },
        }
      );
      setFlightsList(res.data.data.flights);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const convertTo24HourFormat = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours;
  };

  if (Loading) {
    return <h3 style={{ textAlign: "center" }}>Loading..</h3>;
  }
  return (
    <div className="flight-search-container">
      <div className="flight-search-bgc">
        <div className="form-container">
          <form
            className="flight-update-form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Source...(HYD)"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Destination...(MOB)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <DatePicker
              selected={SelectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              placeholderText="Select Date"
              className="datepicker"
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Travellers&Class"
              style={{ cursor: "not-allowed", backgroundColor: "white" }}
              disabled
            />

            <button type="submit">Update</button>
          </form>
        </div>

        <div className="search-result-container">
          <div className="flight-filter">
            <h4>Filters</h4>
            <form>
              <p>Onwards Stops</p>
              <span>
                <input
                  type="checkbox"
                  name="stops"
                  id=""
                  checked={selectedFilters.stops === 0}
                  onChange={(e) => handleFilterChange("stops", 0)}
                />
                <label>Direct</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="stops"
                  id=""
                  checked={selectedFilters.stops === 1}
                  onChange={(e) => handleFilterChange("stops", 1)}
                />
                <label>1 Stops</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="stops"
                  id=""
                  checked={selectedFilters.stops === 2}
                  onChange={(e) => handleFilterChange("stops", 2)}
                />
                <label>2 Stops</label>
              </span>
            </form>
            <form action="">
              <p>Departure</p>
              <span>
                <input
                  type="checkbox"
                  name="departure"
                  id=""
                  onChange={(e) => handleFilterChange("departure", 0)}
                  checked={selectedFilters.departure === 0}
                />
                <label>Before 6AM</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="departure"
                  id=""
                  onChange={(e) => handleFilterChange("departure", 6)}
                  checked={selectedFilters.departure === 6}
                />
                <label>6AM - 12PM</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="departure"
                  id=""
                  onChange={(e) => handleFilterChange("departure", 12)}
                  checked={selectedFilters.departure === 12}
                />
                <label>12PM - 6PM</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="departure"
                  id=""
                  onChange={(e) => handleFilterChange("departure", 18)}
                  checked={selectedFilters.departure === 18}
                />
                <label>After 6PM</label>
              </span>
            </form>

            <form>
              <p>Sort Based on the Price</p>
              <button
                onClick={(e) =>
                  handleFilterChange1(
                    "sortPrice",
                    !selectedFilters.sortPrice,
                    e
                  )
                }
              >
                Sort By Price
              </button>
            </form>
            <form>
              <p>Sort Based on the Duration</p>
              <button
                onClick={(e) =>
                  handleFilterChange1(
                    "sortDuration",
                    !selectedFilters.sortDuration,
                    e
                  )
                }
              >
                Sort By Duration
              </button>
            </form>
            <button onClick={handleResetFilters}>Reset Filters</button>
          </div>
          <div className="flight-list-container">
            {flightsList.length === 0 && <h1>Data Not Found</h1>}
            {flightsList
              .filter((flight) => {
                const flightDeparture = convertTo24HourFormat(
                  flight.departureTime
                );
                return (
                  (selectedFilters.stops === null ||
                    selectedFilters.stops === flight.stops) &&
                  (selectedFilters.departure === null ||
                    (flightDeparture >= selectedFilters.departure &&
                      flightDeparture < selectedFilters.departure + 6))
                );
              })
              .sort((a, b) => {
                if (selectedFilters.sortPrice) {
                  return a.ticketPrice - b.ticketPrice;
                }
                return 0;
              })
              .sort((a, b) => {
                if (selectedFilters.sortDuration) {
                  return a.duration - b.duration;
                }
                return 0;
              })
              .map((flight) => (
                <FlightCard
                  key={flight._id}
                  details={flight}
                  flightId={flight._id}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FlightSearch;
