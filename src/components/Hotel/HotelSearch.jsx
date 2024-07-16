import React, { useEffect, useState } from "react";
import "./Styles/HotelSearch.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import HotelCard from "./HotelCard";
function HotelSearch() {
  const { location } = useParams();
  const [HotelList, setHotelList] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    hotelRating: 0,
    price: 0,
    searchValue: "",
    sort: false,
  });

  const handleFilterChange = (type, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [type]: value,
    });
  };

  const handleResetAll = (e) => {
    e.preventDefault();
    setSelectedFilters({
      hotelRating: 0,
      price: 0,
      searchValue: "",
    });
  };

  const handleSort = (e) => {
    e.preventDefault();
    setSelectedFilters({
      ...selectedFilters,
      sort: !selectedFilters.sort,
    });
  };

  const fetchHotelsData = async () => {
    const config = {
      headers: {
        projectId: "2qduaipfjxvu",
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}`,
        config
      );

      setHotelList(response.data.data.hotels);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelsData();
  }, []);

  return (
    <div className="hotelSearch-container">
      <div className="hotelSearch">
        <div className="searchHotel">
          <input
            type="text"
            placeholder="search hotel names"
            value={selectedFilters.searchValue}
            onChange={(e) => {
              handleFilterChange("searchValue", e.target.value);
            }}
          />
        </div>
        <div className="filter-list">
          <div className="filters">
            <h4>Filters</h4>
            <form action="">
              <p>Rating</p>
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={3.5}
                  checked={selectedFilters.hotelRating === 3.5}
                  onChange={() => handleFilterChange("hotelRating", 3.5)}
                />
                <label htmlFor="">3.5+</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={3.5}
                  checked={selectedFilters.hotelRating === 4}
                  onChange={() => handleFilterChange("hotelRating", 4)}
                />
                <label htmlFor="">4</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={3.5}
                  checked={selectedFilters.hotelRating === 4.5}
                  onChange={() => handleFilterChange("hotelRating", 4.5)}
                />
                <label htmlFor="">4.5</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={3.5}
                  checked={selectedFilters.hotelRating === 5}
                  onChange={() => handleFilterChange("hotelRating", 5)}
                />
                <label htmlFor="">5</label>
              </div>
            </form>

            <form action="">
              <p>Price</p>
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={selectedFilters.price === 3000}
                  onChange={() => handleFilterChange("price", 3000)}
                />

                <label htmlFor="">₹3000-₹5000</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={selectedFilters.price === 5000}
                  onChange={() => handleFilterChange("price", 5000)}
                />

                <label htmlFor="">₹5000-₹7000</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={selectedFilters.price === 7000}
                  onChange={() => handleFilterChange("price", 7000)}
                />

                <label htmlFor="">₹7000-₹9000</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={selectedFilters.price === 9000}
                  onChange={() => handleFilterChange("price", 9000)}
                />

                <label htmlFor="">₹9000+</label>
              </div>
            </form>
            <button onClick={handleSort}>Sort By Price</button>

            <button onClick={handleResetAll}>Reset All</button>
          </div>

          <div className="hotel-list-container">
            {/* {Loading && <h2>Loading...</h2>} */}
            {HotelList.length === 0 && <h2>Data Not Found</h2>}
            {HotelList.length !== 0 &&
              HotelList.filter((hotel) => {
                return (
                  (selectedFilters.hotelRating === 0 ||
                    hotel.rating >= selectedFilters.hotelRating) &&
                  (selectedFilters.price === 0 ||
                    hotel.rooms.some(
                      (room) =>
                        room.price >= selectedFilters.price &&
                        room.price <= selectedFilters.price + 2000
                    )) &&
                  (selectedFilters.searchValue === "" ||
                    hotel.name
                      .toLowerCase()
                      .includes(selectedFilters.searchValue.toLowerCase()))
                );
              })
                .sort((a, b) => {
                  if (selectedFilters.sort) {
                    return a.rating - b.rating;
                  }
                  return 0;
                })
                .map((hotel) => {
                  return <HotelCard details={hotel} key={hotel._id} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelSearch;
