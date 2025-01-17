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
  );
  
}

export default HostList;
