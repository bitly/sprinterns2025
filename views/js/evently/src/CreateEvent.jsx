import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

function CreateEvent() {
  const [EventTitle, setEventTitle ] = useState('Untitled Event');
  const [DateForm, setDateForm] = useState("");
  const [TimeForm, setTimeForm] = useState("");
  const [LocationForm, setLocationForm] = useState("Location");
  const [DescriptionForm, setDescriptionForm] = useState("Description");
  const [AttendeesForm, setAttendeesForm] = useState("");
  const [PublicPrivate, setPublicPrivate] = useState("");
  const [HostName, setHostName] = useState('Host Name');
  const [ContactForm, setContactForm] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          title: EventTitle, date: DateForm, time: TimeForm, location: LocationForm, host_name: HostName, description: DescriptionForm, contact_info: ContactForm, public_private: "public", event_type:EventType, max_attendees: parseInt(AttendeesForm), image_url: imageUrl,
        }),
      });
      if (res.status === 201) {
       const data = await res.json(); 
       console.log(data);
       setSuccessMessage("Event created!")
       setTimeout(() =>
       {
          navigate (`/RSVP/${data.event_id}`);
       },1000);
      }
    }
    catch (err){
      console.log(err);
    }
  }

    return (
      <div className="create-event"> 
          <div className = "create-form-container">
             <div className='enter-details'>
            <h2> Enter the details of your event:</h2>
            </div>
            <form className="create-form" onSubmit={handleSubmit}> 
            <div className='event-title'>
             <h4>Event title</h4>
           </div>
          
              <input value={EventTitle} className = "create-input-boxes" onChange={(e) => {
                  setEventTitle(e.target.value)}}/> 
                  <div className="date">
                    <input type="date" value={DateForm} className = "create-input-boxes" placeholder='(mm/dd/yyyy)' onChange={(e) => setDateForm(e.target.value)}/> 
                  </div>
               </div> 
            </div>
              

              <div className="hostName-time-location-description-container">
                <div className='host-name'>
                  <input value={HostName} className = "create-input-boxes" onChange={(e) => setHostName(e.target.value)}/>
                </div>
                
                  <div className="time">
                    <input type="time" value={TimeForm} className = "create-input-boxes time-input" onChange={(e) => setTimeForm(e.target.value)}/>
                  </div>

                  <div className='location'>
                    <input value={LocationForm} className = "create-input-boxes" onChange={(e) => setLocationForm(e.target.value)}/>
                  </div>

                  <div className='description'>
                    <input value={DescriptionForm} className = "create-input-boxes" onChange={(e) => setDescriptionForm(e.target.value)}/>
                </div>
              </div>


              <div className="max-attendees-private-public-container">
                <div className="max-attendees">
                  <h4>Max attendees</h4>
                  <input value={AttendeesForm} className = "create-input-boxes" onChange={(e) => setAttendeesForm(e.target.value)}/>
                </div>
                <div className="public-status">
                  <h4>Public/Private</h4>
                  <select className = "create-input-boxes" value={PublicPrivate} onChange={(e) => setPublicPrivate(e.target.value)}>
                    <option name="blank" value="blank" >    </option>
                    <option name="public" value="public" > public</option>
                    <option name="private" value="private" >private</option>
                  </select>
                </div>
               </div> 

                <div className='host-name'>
              <h4>Host name</h4>
              <input value={HostName} className = "create-input-boxes" onChange={(e) => setHostName(e.target.value)}/>
                </div>
              
              <div className='contact-info'> 
              <h4>Contact info</h4>
              <input value={ContactForm} className = "create-input-boxes" onChange={(e) => setContactForm(e.target.value)}/>
              </div>
              
              <div className='image-url'>
              <h4>Image URL</h4>
              <input value={imageUrl} className = "create-input-boxes" onChange={(e) => setImageUrl(e.target.value)}/>
              </div>
              
              <br />
              <button type="submit" className="create-save-button">Publish</button>
            </form>
           
            {successMessage && (
            <div role="alert" className="alert">
              <div>{successMessage}</div>
            </div>)}
          </div> 
      </div>
    )
  }

export default CreateEvent;
