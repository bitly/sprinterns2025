import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateEventForm.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateEventForm() {
  const {eventId} = useParams();
  const [eventTitle, setEventTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [attendees, setAttendees] = useState("");
  const [publicPrivate, setPublicPrivate] = useState("");
  const [hostName, setHostName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventType, setEventType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/event/${eventId}`)
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        setError(error);
        setError(
          "Something went wrong, please try again!"
        );
      });
  }, [eventId]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        `http://localhost:3000/api/update-event/${eventId}`,
        {
          method: "PUT",
          mode: "cors",
          body: JSON.stringify({
            event_id: parseInt(eventId),
            title: eventTitle === "" ? eventData.title : eventTitle,
            date: date === "" ? eventData.date : date,
            time: time === "" ? eventData.time : time,
            location: location === "" ? eventData.location : location,
            host_name: hostName === "" ? eventData.host_name : hostName,
            description: description === "" ? eventData.description : description,
            contact_info: contactInfo === "" ? eventData.contact_info : contactInfo,
            public_private: publicPrivate === "" ? eventData.public_private : publicPrivate,
            max_attendees: attendees === "" ? eventData.max_attendees : parseInt(attendees),
            image_url: imageUrl === "" ? eventData.image_url : imageUrl,
            event_type: eventType === "" ? eventData.event_type : eventType,
          }),
        }
      );
      if (res.status === 201) {
        setSuccessMessage("Update created!");
        setTimeout(window.location.replace(`/RSVP/${eventData.event_id}`), 4000);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong updating the form!")
    }
  };

  const handleEventDetailsNavigation = (e) => {
    e.preventDefault();
    navigateTo(`/RSVP/${eventData.event_id}`)
  }

  return (
    <>
      <div className="update-event">
        <div className="update-form-container">
          <div className="enter-details">
            <h2 className="update-event-heading"> Update Your Event Here!</h2>
          </div>

          <form className="create-form" onSubmit={handleUpdateSubmit}>
            <span className="exit-click" onClick={handleEventDetailsNavigation}> X </span>
            

            <div className="event-title-id">
              <div className="update-event-title">
              <h4>Event title</h4>
              <input
                value={eventTitle}
                className="create-input-boxes"
                onChange={(e) => {
                  setEventTitle(e.target.value);
                }}
              />
              </div>
            </div>

            <div className="date-time-container">
              <div className="date">
                <h4>Date</h4>
                <input
                  type="date"
                  value={date}
                  className="create-input-boxes"
                  placeholder="(mm/dd/yyyy)"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="time">
                <h4>Time</h4>
                <input
                  type="time"
                  value={time}
                  className="create-input-boxes time-input"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="location">
              <h4>Location</h4>
              <input
                value={location}
                className="create-input-boxes"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="description">
              <h4>Description</h4>
              <input
                value={description}
                className="create-input-boxes"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="max-attendees-private-public-container">
              <div className="max-attendees">
                <h4>Max attendees</h4>
                <input
                  value={attendees}
                  className="create-input-boxes"
                  onChange={(e) => setAttendees(e.target.value)}
                />
              </div>

              <div className="public-status">
                <h4>Public/Private</h4>
                <select
                  className="create-input-boxes"
                  value={publicPrivate}
                  onChange={(e) => setPublicPrivate(e.target.value)}
                >
                  <option value=""> </option>
                  <option name="public" value="public"> public </option>
                  <option name="private" value="private"> private </option>
                </select>
              </div>
            </div>

            <div className="event-type-container">
              <h4> Event Type: </h4>
              <select
                className="create-input-boxes"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value=""> </option>
                <option name="Social" value="Social"> Social </option>
                <option name="Business" value="Business"> Business </option>
                <option name="Education" value="Education"> Education </option>
                <option name="Arts & Recreation" value="Arts & Recreation"> Arts & Recreation</option>
                <option name="Other" value="Other">  Other </option>
              </select>
            </div>

            <div className="host-name">
              <h4>Host name</h4>
              <input
                value={hostName}
                className="create-input-boxes"
                onChange={(e) => setHostName(e.target.value)}
              />
            </div>

            <div className="contact-info">
              <h4>Contact info</h4>
              <input
                value={contactInfo}
                className="create-input-boxes"
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </div>

            <div className="image-url">
              <h4>Image URL</h4>
              <input
                value={imageUrl}
                className="create-input-boxes"
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <br />
            <button type="submit" className="update-button"> Update </button>
          </form>

          {error ? (
            <>
              {error && (
                <div role="alert" className="error-alert">
                  <div>{error}</div>
                </div>
              )}
            </>
          ) : (
            <>
              {successMessage && (
                <div role="alert" className="alert">
                  <div>{successMessage}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
