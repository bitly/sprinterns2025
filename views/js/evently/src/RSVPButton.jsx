import React, { useState, useEffect } from "react";
import "./RSVPButton.css";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import DefaultImage from "./Images/default.png";
import axios from 'axios';

function RSVPButton() {
  const { eventId } = useParams();
  const [eventData, setEventDetails] = useState([]);
  const [rsvps, setRSVPs] = useState([]); //allow user 
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
    const fetchRSVPs = async () => { //function to fetch RSVPs
      console.log("is this running");
      try {
        const response = await fetch( //fetching RSVPs to get details
          `http://localhost:3000/api/event/${eventId}/rsvps` //the webs url with event id parameter
        );
        const rsvpData = await response.json();  //getting the response in json format
        console.log("hi", rsvpData);
        setRSVPs(rsvpData ?? []); //updating the state with the response
      } catch (error) {
        setError( //error message if there is an error n it failed to fetch RSVPs
          "The server ran into an error getting the RSVPs, please try again!" // err message
        );
      }
    };
    fetchRSVPs(); // Call fetchRSVPs to get RSVP data */
    fetchEventDetails();
  }, [eventId]);

  function handleRSVP(e) {
    e.preventDefault();
    navigateTo(`/rsvp-form/${eventData.event_id}`);
  }

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    navigateTo(`/update-event/${eventData.event_id}`);

  };

  const deleteEvent = async () =>
    {
      if (!eventData || !eventData.event_id)
      {
        console.error("Event data is missing or event_id is undefined");
        return;
      }
      try 
        {
          await axios.delete(`http://localhost:3000/api/event/${eventData.event_id}/delete`);
          navigateTo('/community-page/');

        }

        catch(error)
        {
          console.error('An error has occured trying to delete this item.', error);
        }

        if (!eventData) {
          return <p>Loading...</p>;
        }
    };
  const getEmoji = (rsvp_response) => {
    switch (rsvp_response.toLowerCase()) {
      case 'yes':
        return '😊';
      case 'maybe':
        return '🤔';
      case 'no':
        return '😞';
      default:
        return '';
    }
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
                <p> RSVPs: {rsvps.length}</p>
              </div>
            </div>

          <div className="btns">
            <button className="rsvp-button" onClick={handleRSVP}> RSVP! </button>
            <button className="update-button" onClick={handleUpdateEvent}> Update! </button>
            <button className="delete-button" onClick={deleteEvent}> Delete! </button>
          </div>
          <div className="rsvp-list">
            <h3>RSVP List</h3>
            <ul>
          {rsvps.map((rsvp) => (
            <li key={rsvp.user_id} className="rsvp-item">
              <div className="rsvp-info-box">
                <p className="rsvp-name">{
                rsvp.first_name} {rsvp.last_name} <span className="rsvp-said">said</span> {rsvp.rsvp_response} {getEmoji(rsvp.rsvp_response)} </p>
                <p className="rsvp-email">{rsvp.email}</p>
                <p className="rsvp-phone">{rsvp.phone_number}</p>
                <p className="rsvp-response">{rsvp.response}</p>
              </div>
            </li>
          ))}
        </ul>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
export default RSVPButton;
