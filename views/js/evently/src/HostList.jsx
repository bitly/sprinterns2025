import React, { useState, useEffect } from "react";
import "./HostList.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function HostList() {
  const [attendeeData, setAttendeeData] = useState([]);
  const [error, setError] = useState("");
  // const [selectEvent, setSelectEvent] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/attendees-all`)
      .then((response) => {
        setAttendeeData(response.data);
      })
      .catch((error) => {
        setError(
          "The server ran into an error getting the attendees, please try again!"
        );
        setError(error);
      });
  }, []);

  // const handleEventClick = (attendee) => {
  //   try {
  //     setSelectEvent(attendee);
  //     navigateTo(`/RSVP/${attendees.attendees_id}`);
  //   } catch {
  //     setError("Something went wrong connecting");
  //   }
  // };

  return (
<<<<<<< HEAD
    <>
      {/* <div className="attendees-nav-container">
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
      </div> */}

      {error ? (
        <div className="error-display">
          <p> Error! Something went wrong loading attendeess. </p>
          <p>Please try again!</p>
          <Link to="/">
            <p>Home</p>
          </Link>
        </div>
      ) : (
        <div className="public-attendees-container">
          <div className="attendees-row">
            {attendeeData.map((attendees) => (
              <div
                key={attendees.attendees_id} //Either attendees.attendees_id or attendee.id.
                className="attendees-card"
                // onClick={() => handleEventClick(attendees)}
              >
                <p className="attendees-card-name"> {attendees.first_name} {attendees.last_name}</p>
                <div className="attendees-img">
                  <img
                    src={
                      attendees.image_url !== "" ? attendees.image_url : "default.png"
                    }
                    alt="User inputed description."
                  />
                </div>
                <div className="email-and-phone-number-container">
                  <h4> Phone Number: {attendees.phone_number}</h4>
                  <h4> Email: {attendees.email}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* {selectEvent && <RSVPButton attendees={selectEvent} />} */}
    </>
=======
    <div>
      <div className="header">
        <h1>Discover New People</h1>
        <Link to="/create-host" className="host-button">Join now</Link>
      </div>  
  
      <table>
        <thead className="column-names">
          <tr>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th> 
          </tr>
        </thead>
        <tbody>
          {hosts.map(host => (
            <tr key={host.host_id}>
              <td>
                <div className="profile-img">
                  <img
                    src={
                      host.image_url !== "" ? host.image_url : "default.png"
                    }
                    alt={`Image for ${host.first_name} ${host.last_name}`}
                  />
                </div>
              </td>
              <td>{host.first_name}</td>
              <td>{host.last_name}</td>
              <td>{host.email}</td>    
            </tr>
          ))}
        </tbody>
      </table>  
    </div>
>>>>>>> d3c9750 (Worked on frontend for people page + form page to play around with design implmenetation)
  );
  
}

export default HostList;
