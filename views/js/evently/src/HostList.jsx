import React, { useEffect, useState } from 'react';
import "./HostList.css";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import profileImage1 from "./profile_img.jpg"

function HostList() {
  const [hosts, setHosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios
    // Fetch hosts when the component mounts
      .get(`http://localhost:3000/api/get-all-hosts`)
      .then((response) => {
        setHosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          "The server ran into an error getting the events, please try again!"
        );
        setError(error);
        setIsLoading(false);
      });
  }, []);
    

  return (
    <div className="all-hosts-container">
      <div className="header">
        <h1>Discover New People</h1>
      </div>

     {/* <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {hosts.length > 0 ? (
            hosts.map((host) => (
              <tr key={host.host_id}>
                <td className="profile-img">
                  <img
                    src={
                      host.image_url !== "" ? host.image_url : "default.png"
                    }
                    alt={`Image for ${host.first_name} ${host.last_name}`}
                  />
                </td>
                <td>{host.first_name}</td>
                <td>{host.last_name}</td>
                <td>{host.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No hosts available
              </td>
            </tr>
          )}
        </tbody>
      </table>
*/}



      <div class="nav-bar-container">
      <Link to="/create-host" className="host-button">Join now</Link>
        <div class="account-search-bar">
        <span class="account-search-btn"> 🔍</span>
          <input class="account-search-input" type="text" placeholder="Start Your Search Here!" />
        </div>
      </div>


        <div class="peopleSection">


        <div class="accountContainer">
          <div class="accountInfo">
            <img src={profileImage1} alt="Profile picture" className="profile-image" />
          </div>
            <p>Attendee</p>
            <h2>John Doe</h2>
            <h2>fake@gmail.com</h2>
        </div>
        
        <div class="accountContainer">
          <div class="accountInfo">
            <img src={profileImage1} alt="Profile picture" className="profile-image" />
          </div>
            <p>John Doe</p>
        </div>

        <div class="accountContainer">
          <div class="accountInfo">
            <img src={profileImage1} alt="Profile picture" className="profile-image" />
          </div>
            <p>John Doe</p>
        </div>

        <div class="accountContainer">
          <div class="accountInfo">
            <img src={profileImage1} alt="Profile picture" className="profile-image" />
          </div>
            <p>John Doe</p>
        </div>

        <div class="accountContainer">
          <div class="accountInfo">
            <img src={profileImage1} alt="Profile picture" className="profile-image" />
          </div>
            <p>John Doe</p>
        </div>

        <div class="accountContainer">
          <div class="accountInfo">
            <img src={profileImage1} alt="Profile picture" className="profile-image" />
          </div>
            <p>John Doe</p>
            
        </div>

        <div class="accountContainer">
          <div class="accountInfo">
            <img src={profileImage1} alt="Profile picture" className="profile-image" />
          </div>
            <p>John Doe</p>
        </div>

        <div class="accountContainer">
          <div class="accountInfo">
            <img src={profileImage1} alt="Profile picture" className="profile-image" />
          </div>
            <p>John Doe</p>
        </div>

        <div class="accountContainer">
          <div class="accountInfo">
            <img src={profileImage1} alt="Profile picture" className="profile-image" />
          </div>
            <p>John Doe</p>
        </div>



      </div>




    </div>
  );
  
}

export default HostList;