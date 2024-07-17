import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import TrainCard from "./TrainCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Styles/Train.css";

export default function TrainSearch() {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const state = location.state;
  const [loading, setLoading] = useState(false);
  const [Traintlist, setTrainList] = useState([]);
  const [day, setDay] = useState(state.day);
  const [source, setSource] = useState(state.source);
  const [destination, setDestination] = useState(state.destination);
  const [selectedFilters, setSelectedFilters] = useState({
    arraival: null,
    sortPrice: false,
    sortDuration: false,
    depature: null,
  });

  const handleResetFilters = () => {
    setSelectedFilters({
      arraival: null,
      sortPrice: false,
      sortDuration: false,
      depature: null,
    });
  };

  useEffect(() => {
    getTrainsData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value,
    });
  };

  const getTrainsData = async () => {
    const config = {
      headers: {
        projectId: "2qduaipfjxvu",
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/train?day=${day}&search={"source":"${source}","destination":"${destination}"}`,
        config
      );
      setTrainList(response.data.data.trains);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const convertTo24HourFormat = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours;
  };

  const convertTo24HourForm = (time) => {
    const hour = time.split(" ")[0];
    let newhour;
    if (hour.charAt(1) === "h") {
      newhour = hour.charAt(0);
    } else {
      newhour = hour.charAt(0) + hour.charAt(1);
    }

    return newhour;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      const day = selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
    }
    getTrainsData();
  };

  return (
    <div>
      <div className="flight-search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="from"
            placeholder="Enter Source"
            onChange={(e) => setSource(e.target.value)}
            value={source}
          />
          <input
            type="text"
            id="to"
            placeholder="Enter Destination"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
          />
          <span>
            <button type="submit" id="flight-update">
              UPDATE SEARCH
            </button>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              placeholderText="Select Date"
              className="datepicker"
              popperPlacement="bottom-start"
              style={{ height: "8px" }}
            />
          </span>
        </form>
      </div>

      <div className="filter">
        <div className="filtersbox">
          <h4>Filters</h4>
          <form>
            <p>Depature</p>
            <span>
              <input
                type="checkbox"
                name="time"
                id="before 6"
                value={0}
                checked={selectedFilters.depature === 0}
                onChange={() => handleFilterChange("depature", 0)}
              />
              <label htmlFor="before 6"> Before 6AM</label>
            </span>
            <span>
              <input
                type="checkbox"
                name="time"
                id="before 12"
                value={6}
                checked={selectedFilters.depature === 6}
                onChange={() => handleFilterChange("depature", 6)}
              />
              <label htmlFor="before 12"> 6AM - 12PM</label>
            </span>
            <span>
              <input
                type="checkbox"
                name="time"
                id="before 18"
                value={12}
                checked={selectedFilters.depature === 12}
                onChange={() => handleFilterChange("depature", 12)}
              />
              <label htmlFor="before 18"> 12PM - 6PM</label>
            </span>
            <span>
              <input
                type="checkbox"
                name="time"
                id="before 24"
                value={18}
                checked={selectedFilters.depature === 18}
                onChange={() => handleFilterChange("depature", 18)}
              />
              <label htmlFor="before 24"> After 6PM</label>
            </span>
          </form>
          <form>
            <p>Arraival</p>
            <span>
              <input
                type="checkbox"
                name="time"
                id="before 6"
                value={0}
                checked={selectedFilters.arraival === 0}
                onChange={() => handleFilterChange("arraival", 0)}
              />
              <label htmlFor="before 6"> Before 6AM</label>
            </span>
            <span>
              <input
                type="checkbox"
                name="time"
                id="before 12"
                value={6}
                checked={selectedFilters.arraival === 6}
                onChange={() => handleFilterChange("arraival", 6)}
              />
              <label htmlFor="before 12"> 6AM - 12PM</label>
            </span>
            <span>
              <input
                type="checkbox"
                name="time"
                id="before 18"
                value={12}
                checked={selectedFilters.arraival === 12}
                onChange={() => handleFilterChange("arraival", 12)}
              />
              <label htmlFor="before 18"> 12PM - 6PM</label>
            </span>
            <span>
              <input
                type="checkbox"
                name="time"
                id="before 24"
                value={18}
                checked={selectedFilters.arraival === 18}
                onChange={() => handleFilterChange("arraival", 18)}
              />
              <label htmlFor="before 24"> After 6PM</label>
            </span>
          </form>
          <form>
            <p>Sort based on Price</p>
            <input
              type="button"
              id="price"
              name="price"
              onClick={() =>
                handleFilterChange("sortPrice", !selectedFilters.sortPrice)
              }
              value="Sort by Price"
              className="train-filter-price"
            />
          </form>

          <form>
            <p>Sort based on Duration</p>
            <input
              type="button"
              id="duration"
              name="duration"
              onClick={() =>
                handleFilterChange(
                  "sortDuration",
                  !selectedFilters.sortDuration
                )
              }
              value="Sort by duration"
              className="train-filter-price"
            />
          </form>

          <button onClick={handleResetFilters} id="train-reset-button">
            Reset filters
          </button>
        </div>
      </div>

      <div className="hotel-list-container">
        {Traintlist.filter((train) => {
          const trainDeparture = convertTo24HourFormat(train.departureTime);
          const trainArraival = convertTo24HourFormat(train.arrivalTime);

          return (
            (selectedFilters.stops === null ||
              train.stops === selectedFilters.stops) &&
            (selectedFilters.depature === null ||
              (trainDeparture >= selectedFilters.depature &&
                trainDeparture < selectedFilters.depature + 6)) &&
            (selectedFilters.arraival === null ||
              (trainArraival >= selectedFilters.arraival &&
                trainArraival < selectedFilters.arraival + 6))
          );
        })
          .sort((a, b) => {
            if (selectedFilters.sortDuration) {
              const trainDurationA = Number(
                convertTo24HourForm(a.travelDuration)
              );
              const trainDurationB = Number(
                convertTo24HourForm(b.travelDuration)
              );
              return trainDurationA - trainDurationB;
            } else if (selectedFilters.sortPrice) {
              return a.fare - b.fare;
            }
            return 0;
          })

          .map((train) => (
            // <TrainCard details={train} key={train._id} trainId={train._id} />
            <p>`train${train._id}`</p>
          ))}
      </div>
    </div>
  );
}
