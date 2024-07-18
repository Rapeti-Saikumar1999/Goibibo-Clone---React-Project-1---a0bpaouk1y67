import "./Styles/BusSearch.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BusCard from "./BusCard";

export default function BusSearch() {
  const location = useLocation();
  const state = location.state;
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Buslist, setBusList] = useState([]);
  const [day, setDay] = useState(state.day);
  const [source, setSource] = useState(state.source);
  const [destination, setDestination] = useState(state.destination);
  const [selectedFilters, setSelectedFilters] = useState({
    sortPrice: false,
    arrival: null,
    departure: null,
    busType: null,
  });

  const handleResetFilters = () => {
    setSelectedFilters({
      busType: null,
      arrival: null,
      sortPrice: false,
      departure: null,
    });
  };

  useEffect(() => {
    getBusData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value,
    });
  };

  const getBusData = async () => {
    const config = {
      headers: {
        projectId: "2qduaipfjxvu",
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/bus?day=${day}&search={"source":"${source}","destination":"${destination}"}`,
        config
      );

      setBusList(response.data.data.buses);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const convertTo24HourFormat = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      const day = selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
    }
    getBusData();
  };

  return (
    <div>
      <div className="bus-search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="from"
            placeholder="From..."
            onChange={(e) => setSource(e.target.value)}
            value={source}
          />
          <input
            type="text"
            id="to"
            placeholder="To...."
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
          />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            placeholderText="Select Date"
            className="datepicker"
            popperPlacement="bottom-start"
            style={{ height: "8px" }}
          />
          <button type="submit">UPDATE SEARCH</button>
        </form>
      </div>

      <div className="filter">
        <h4>Filters</h4>
        <form>
          <p>Bus Type</p>
          <span>
            <input
              type="checkbox"
              value={"AC"}
              checked={selectedFilters.busType === "AC"}
              onChange={() => handleFilterChange("busType", "AC")}
            />
            <label htmlFor="ac"> AC</label>
          </span>
          <span>
            <input
              type="checkbox"
              value={"Non-AC"}
              checked={selectedFilters.busType === "Non-AC"}
              onChange={() => handleFilterChange("busType", "Non-AC")}
            />
            <label htmlFor="nonac"> NON AC </label>
          </span>
        </form>
        <form>
          <p>departure</p>
          <span>
            <input
              type="checkbox"
              value={0}
              checked={selectedFilters.departure === 0}
              onChange={() => handleFilterChange("departure", 0)}
            />
            <label htmlFor="before 6"> Before 6AM</label>
          </span>
          <span>
            <input
              type="checkbox"
              value={6}
              checked={selectedFilters.departure === 6}
              onChange={() => handleFilterChange("departure", 6)}
            />
            <label htmlFor="before 12"> 6AM - 12PM</label>
          </span>
          <span>
            <input
              type="checkbox"
              value={12}
              checked={selectedFilters.departure === 12}
              onChange={() => handleFilterChange("departure", 12)}
            />
            <label htmlFor="before 18"> 12PM - 6PM</label>
          </span>
          <span>
            <input
              type="checkbox"
              value={18}
              checked={selectedFilters.departure === 18}
              onChange={() => handleFilterChange("departure", 18)}
            />
            <label htmlFor="before 24"> After 6PM</label>
          </span>
        </form>
        <form>
          <p>Arrival</p>
          <span>
            <input
              type="checkbox"
              value={0}
              checked={selectedFilters.arrival === 0}
              onChange={() => handleFilterChange("arrival", 0)}
            />
            <label htmlFor="before 6"> Before 6AM</label>
          </span>
          <span>
            <input
              type="checkbox"
              value={6}
              checked={selectedFilters.arrival === 6}
              onChange={() => handleFilterChange("arrival", 6)}
            />
            <label htmlFor="before 12"> 6AM - 12PM</label>
          </span>
          <span>
            <input
              type="checkbox"
              value={12}
              checked={selectedFilters.arrival === 12}
              onChange={() => handleFilterChange("arrival", 12)}
            />
            <label htmlFor="before 18"> 12PM - 6PM</label>
          </span>
          <span>
            <input
              type="checkbox"
              value={18}
              checked={selectedFilters.arrival === 18}
              onChange={() => handleFilterChange("arrival", 18)}
            />
            <label htmlFor="before 24"> After 6PM</label>
          </span>
        </form>

        <button
          onClick={() =>
            handleFilterChange("sortPrice", !selectedFilters.sortPrice)
          }
        >
          Sort By Price
        </button>

        <button onClick={handleResetFilters} className="busfilters-button">
          Reset filters
        </button>
      </div>

      <div className="hotel-list-container">
        {Buslist.filter((bus) => {
          const BusDeparture = convertTo24HourFormat(bus.departureTime);
          const BusArrival = convertTo24HourFormat(bus.arrivalTime);
          return (
            (selectedFilters.busType === null ||
              bus.type === selectedFilters.busType) &&
            (selectedFilters.departure === null ||
              (BusDeparture >= selectedFilters.departure &&
                BusDeparture < selectedFilters.departure + 6)) &&
            (selectedFilters.arrival === null ||
              (BusArrival >= selectedFilters.arrival &&
                BusArrival < selectedFilters.arrival + 6))
          );
        })
          .sort((a, b) => {
            if (selectedFilters.sortPrice) {
              return a.fare - b.fare;
            }
            return 0;
          })
          .map((bus) => (
            <BusCard key={bus._id} details={bus} />
          ))}
      </div>
    </div>
  );
}
