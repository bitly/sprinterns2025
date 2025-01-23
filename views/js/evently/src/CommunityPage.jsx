import React, { useState, useEffect } from "react";
import "./CommunityPage.css";
import SearchBar from "./SearchBar.jsx";
import axios from "axios";
import RSVPButton from "./RSVPButton";
import { useNavigate, Link } from "react-router-dom";
import profileImageDefault from './Images/default.png';

function CommunityPage() {
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);
  const navigateTo = useNavigate();
  const [filteredData, setFilteredData] = useState([]); 


  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/public-events`)
      .then((response) => {
        setEventData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        setError(
          "The server ran into an error getting the events, please try again!"
        );
        setError(error);
      });
  }, []);

  const handleEventClick = (event) => {
    try {
      setSelectEvent(event);
      navigateTo(`/RSVP/${event.event_id}`);
    } catch {
      setError("Something went wrong connecting");
    }
  };
  const handleSearch = (searchTerm, searchCategory) => {
    console.log("Search Category:", searchCategory);
    let filtered = eventData;
    if(
      searchCategory && searchCategory !== "All"
    ){
      filtered = filtered.filter(item => item.event_type === searchCategory.toLowerCase())
    }
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Filter events by title
    console.log("Search term:", filtered);
    setFilteredData(filtered); // Update filtered results
  };

  return (
    <>
      
      <h2 className="browse-title"> Browse Events</h2>
      
      <SearchBar onSearch={handleSearch} /> 

      {error ? (
        <div className="error-display">
          <p> Error! Something went wrong loading events. </p>
          <p>Please try again!</p>
          <Link to="/">
            <p>Home</p>
          </Link>
        </div>
      ) : (
            
        <div className="public-events-container">
          {console.log("Currently displayed filtered data:", filteredData)}
          <div className="events-row">
            {filteredData.map((event) => (
              <div
                key={event.event_id}
                className="event-card-community"
                onClick={() => handleEventClick(event)}
              >
                <div className="event-img">
                  <img
                    src={
                      event.image_url !== "" ? event.image_url : profileImageDefault
                    }
                    alt="User inputted description."
                  />
                </div>
                < p className="event-card-title"> {event.title}</p>
                <div className="date-and-time-container">
                  <h4> Date: {event.date}</h4>
                  <h4> Time: {event.time}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectEvent && <RSVPButton event={selectEvent} />}
    </>
  );
}

export default CommunityPage;
