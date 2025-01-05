import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RSVPList.css';
import {
    Link
  } from "react-router-dom";

export default function RSVPList () {
  const [rsvps, setRSVPs] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(true); 
    // the event id endpoint is hard coded, ideally we want this page to be connected to the event details page.
    axios.get(
        'http://localhost:3000/api/rsvp/5')
        .then((response) => {
            setRSVPs(response.data);
            setLoading(false); // after we have received our data and everything is loaded, we are setting it to false, we now know the page is no longer fetching data from the backend
        })
        .catch((error) => {
            setLoading(false);
        });
    }, []); // this is the dependency array, an array of values the effect depends on, if the values inside of our array change, react will re-render the effect

  return (
    <div className='rsvp-table-container'>
        <Link to='/community-page'>
            <span className='exit'> X </span>
        </Link>

        <h2 className='title'> Who's Attending "Event Title" </h2>
        <table className='rsvp-table'>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Response</th>
                </tr>
            </thead>
            {loading && <span className='loading'>Loading...</span>}
            <tbody className='table-body'>
            {/* we are mapping over each row inside of the rsvps array and placing the information into the table row */}
                    {rsvps.map((rsvp) => (
                    // the mapping function in react needs a key, we are setting the key to be the rsvp_id
                        <tr key={rsvp.rsvp_id}>
                            <td>{rsvp.first_name}</td>
                            <td>{rsvp.last_name}</td>
                            <td>{rsvp.phone_number}</td>
                            <td>{rsvp.email}</td>
                            <td>{rsvp.rsvp_response}</td>
                        </tr>
                    ))}         
            </tbody>
      </table>
    </div>
  );
};