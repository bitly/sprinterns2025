import React, { useEffect, useState } from 'react';
import "./HostList.css";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

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
    <div>
    <div className= "header">
        <h1>All Hosts</h1>
        <Link to="/create-host" className="host-button"> Create Host</Link>
    </div>  
      <table>
        <thead className= "column-names">
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
              <div className="profile-img">
              <td>
                <img
                    src={
                        host.image_url !== "" ? host.image_url : "default.png"
                    }
                    alt={`Image for ${host.first_name} ${host.last_name}`}
                />
              </td>
              </div>  
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