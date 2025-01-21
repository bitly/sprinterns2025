import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

function CreateEvent() {
  const [EventTitle, setEventTitle ] = useState("Untitled Event");
  const [image, setImage] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [DateForm, setDateForm] = useState("Set a Date...");
  const [TimeForm, setTimeForm] = useState("TIME");
  const [LocationForm, setLocationForm] = useState("LOCATION");
  const [DescriptionForm, setDescriptionForm] = useState("Description");
  const [AttendeesForm, setAttendeesForm] = useState("MAX ATTENDEES");
  const [InvitesForm, setInvitesForm] = useState("");
  const [PublicPrivate, setPublicPrivate] = useState("");
  const [EventType, setEventType] = useState(""); //TS
  const [HostName, setHostName] = useState("HOST NAME");
  const [ContactForm, setContactForm] = useState("Contact Info");
  const [imageUrl, setImageUrl] = useState("IMAGE URL");
  const [successMessage, setSuccessMessage] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          title: EventTitle, date: DateForm, time: TimeForm, invites:InvitesForm, location: LocationForm, host_name: HostName, description: DescriptionForm, contact_info: ContactForm, public_private: "public", event_type:EventType, max_attendees: parseInt(AttendeesForm), image_url: imageUrl,
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
  
  //Default Image
  const defaultImage = 'https://images.pexels.com/photos/16220888/pexels-photo-16220888/free-photo-of-birthday-party-catering.jpeg';

  //Function that handles if user wants to change image
  const handleImageChange = (e) => 
  {
    const file = e.target.files[0];
    if (file)
    {
      const reader = new FileReader();
      reader.onloadend = () =>
      {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleState = () =>
  {
    setIsSelected(prevState => !prevState);
  }

    return (
      <div className="create-event"> 
          <div className = "create-form-container">
            <form className="create-form" onSubmit={handleSubmit}>
            <div className = "event-and-date">
              <div className='event-title'>
              <input value={EventTitle} className = "create-input-boxes" onChange={(e) => {
                  setEventTitle(e.target.value)}}/> 
                  <div className="date">
                    <input  
                      type="date" 
                      value={DateForm} 
                      className = "create-input-boxes" 
                      placeholder= "(mm/dd/yyyy)" 
                      onChange={(e) => setDateForm(e.target.value)}/> 
                  </div>
               </div> 
            </div>
              

              <div className="name-attendees-time-location-description-container">
                <div className='host-name'>
                  <input 
                    value={HostName} 
                    className = "create-input-boxes" 
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder = "Host Name"
                  />
                </div>

                <div className="max-attendees">
                  <input 
                    value={AttendeesForm} 
                    className = "create-input-boxes" 
                    onChange={(e) => setInvitesForm(e.target.value)}
                  />
                </div>
                
                  <div className="time">
                    <input 
                      type="time" 
                      value={TimeForm}
                      className = "create-input-boxes time-input" 
                      onChange={(e) => setTimeForm(e.target.value)}
                      placeholder = "Time"
                    />
                  </div>

                  <div className='location'>
                    <input 
                      value={LocationForm} 
                      className = "create-input-boxes" 
                      onChange={(e) => setLocationForm(e.target.value)}
                      placeholder= "Location"
                    />
                  </div>

                  <div className='description'>
                    <textarea
                      value={DescriptionForm} 
                      className = "create-input-boxes"
                      onChange={(e) => setDescriptionForm(e.target.value)}
                      rows = "5"
                      cols = "50"
                      placeholder= "Description"
                    />
                </div>
              </div>


              <div className="invites-private-public-container">
                {/* Invites that are either on and off */}
                <div className="invites">
                  <h4>Invites</h4>
                    <div 
                      className = "toggle-section"
                      id = "create-input-boxes" 
                      value={InvitesForm} 
                      onChange={(e) => setPublicPrivate(e.target.value)}
                      
                    >
                      <label className="switch">
                        <input
                           type="checkbox" 
                           checked = {isSelected} //to see if checkbox is checked 
                           onChange = {toggleState} // toggle to when it is checked
                        />
                        <span className = "slider"></span>
                      </label>
                    </div>
                </div>


                 {/* Submit Button */}
                <div className = "submit-button">
                  <button 
                    type="submit" 
                    className="create-save-button">PUBLISH
                  </button>

                  {successMessage && (
                  <div 
                    role="alert" 
                    className="alert">

                  <div>{successMessage}</div>
                </div>)}
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
                
              <div className='right-side-container'>
                <div className='image-url'>
                  <img
                    src = {image || defaultImage}
                    alt = "Uploaded Preview"
                    width = "600"
                    height = "400"
                  />

                  <input 
                    className = "img-input-boxes"
                    type = "file"
                    accept = "image"
                    onChange = {handleImageChange}
                  
                  />
            
                <input value={imageUrl} className = "create-input-boxes" onChange={(e) => setImageUrl(e.target.value)}/>
                </div>
    
                              
                <div className='contact-info'>
                  <textarea value={ContactForm} className = "create-input-boxes" onChange={(e) => setContactForm(e.target.value)}/>
                </div>
              </div>

              {/* End of Form */}
              <br />
            </form>
          </div> 
      </div>
    )
  }

export default CreateEvent;

