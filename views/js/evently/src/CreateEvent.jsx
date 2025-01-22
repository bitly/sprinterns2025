import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

function CreateEvent() {
  const [EventTitle, setEventTitle ] = useState("");
  const [image, setImage] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [DateForm, setDateForm] = useState("");
  const [TimeForm, setTimeForm] = useState("");
  const [LocationForm, setLocationForm] = useState("");
  const [DescriptionForm, setDescriptionForm] = useState("");
  const [AttendeesForm, setAttendeesForm] = useState("");
  const [PublicPrivate, setPublicPrivate] = useState("");
  const [EventType, setEventType] = useState(""); //TS
  const [HostName, setHostName] = useState("");
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
       },2000);
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
              <input 
                value={EventTitle} 
                className = "create-input-boxes" 
                onChange={(e) => { setEventTitle(e.target.value)}}
                placeholder = "Untitled Event"/> 

                
                  <div className="date">
                    <input  
                      type="date" 
                      value={DateForm} 
                      className = "create-input-boxes" 
                      placeholder= "Set a date..." 
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
                    placeholder = "HOST NAME"
                  />
                </div>
                

                <div className="max-attendees">
                  <input 
                    value={AttendeesForm} 
                    className = "create-input-boxes" 
                    onChange={(e) => setAttendeesForm(e.target.value)}
                    placeholder= "MAX ATTENDEES"
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
                      placeholder= "LOCATION"
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


              <div className="private-public-container">
                <div className="public-status">
                    <h4>PUBLIC/PRIVATE</h4>
                    <select 
                      className = "create-input-boxes" 
                      value={PublicPrivate} 
                      onChange={(e) => setPublicPrivate(e.target.value)}
                      
                    >
                      <option name="blank" value="blank" >    </option>
                      <option name="public" value="public" > public</option>
                      <option name="private" value="private" >private</option>
                    </select>
                  </div>

                  <div className="event-type-container">
                    <h4> EVENT TYPE </h4>
                    <select
                      className="create-input-boxes"
                      value={EventType}
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
                
              </div>

                
              <div className='right-side-container'>
                <div className='image-url'>
                  <img
                    src = {image || defaultImage}
                    alt = "Default Image of a Birthday Party"
                    width = "600"
                    height = "400"
                  />

                  <input 
                    className = "img-input-boxes"
                    type = "file"
                    accept = "image/*"
                    id = "file-input"
                    onChange = {handleImageChange}
                  />

                  <label 
                    for="file-input"
                    class = "custom-file-input">
                    EDIT
                    </label>
            
                <input 
                  value={imageUrl} 
                  className = "create-input-boxes" 
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder= "IMAGE URL"
                />
                </div>
    
                              
                <div className='contact-info'>
                  <textarea 
                    value={ContactForm} 
                    className = "create-input-boxes" 
                    id='contactInfo'
                    onChange={(e) => setContactForm(e.target.value)}
                    placeholder = "Contact Info"
                  />
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

