import React, { useState, useEffect } from "react";
import "./CommunityPage.css";
import axios from "axios";
import RSVPButton from "./RSVPButton";
import { useNavigate, Link } from "react-router-dom";

function CommunityPage() {
  const [eventData, setEventDetails] = useState([]);
  const [error, setError] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/public-events`)
      .then((response) => {
        setEventDetails(response.data);
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

  return (
    <>
      <div className="event-nav-container">
        <h2 className="browse-title"> Browse Events</h2>
        <div className="search-bar">
          <input type="text" placeholder="Start Your Search Here!" />
          <button className="search-btn"> 🔍 </button>
        </div>

        <div className="link-container">
          <button className="btn"> All Events </button>
          <button className="btn"> Social </button>
          <button className="btn"> Business </button>
          <button className="btn"> Education </button>
          <button className="btn"> Arts & Recreation </button>
        </div>
      </div>

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
          <div className="events-row">
            {eventData.map((event) => (
              <div
                key={event.event_id}
                className="event-card"
                onClick={() => handleEventClick(event)}
              >
                <p className="event-card-title"> {event.title}</p>
                <div className="event-img">
                  <img
                    src={
                      event.image_url !== "" ? event.image_url : "default.png"
                    }
                    alt="User inputted description."
                  />
                </div>
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
