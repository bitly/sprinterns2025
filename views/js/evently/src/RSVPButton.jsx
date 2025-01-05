import React, { useState, useEffect } from "react";
import "./RSVPButton.css";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import DefaultImage from "./Images/default.png";

function RSVPButton() {
  const { eventId } = useParams();
  const [eventData, setEventDetails] = useState([]);
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const eventDateTime = new Date(eventData.date + " " + eventData.time);
  const formatDate = eventDateTime.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  const formatTime = eventDateTime.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/event/${eventId}`
        );
        const eventData = await response.json();
        setEventDetails(eventData);
      } catch (error) {
        setError(
          "The server ran into an error getting the events, please try again!"
        );
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleRSVP = (e) => {
    e.preventDefault();
    navigateTo(`/rsvp-form/${eventData.event_id}`);
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    navigateTo(`/update-event/${eventData.event_id}`);

  };

  return (
    <div className="rsvp-event">
      <div className="user-info">
        {error ? (
          <div className="error-display">
            <p> Error! Something went wrong displaying the event. </p>
            <p>Please try again!</p>
            <Link to="/community-page">
              <p>Back</p>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/community-page">
              <span className="exit"> X </span>
            </Link>
            <div className="image-container">
              <img
                src={
                  eventData.image_url !== ""
                    ? eventData.image_url
                    : DefaultImage
                }
                alt="User inputted description"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            <div className="event-details">
              <div className="location-description">
                <p> 📍 {eventData.location}</p>
                <p> {eventData.description}</p>
              </div>

              <div className="contact-container">
                <p> Host Name: {eventData.host_name}</p>
                <p>Contact: {eventData.contact_info}</p>
                <p>Event Type: {eventData.event_type}</p>
              </div>

              <div className="date-time-container">
                <p> Date: {formatDate}</p>
                <p> Time: {formatTime}</p>
              </div>

              <div className="max-rsvp-container">
                <p> Max Attendees: {eventData.max_attendees}</p>
                <p> RSVPs: {eventData.num_of_RSVP}</p>
              </div>
            </div>

          <div className="btns">
            <button className="rsvp-button" onClick={handleRSVP}> RSVP! </button>
            <button className="update-button" onClick={handleUpdateEvent}> Update </button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
export default RSVPButton;
