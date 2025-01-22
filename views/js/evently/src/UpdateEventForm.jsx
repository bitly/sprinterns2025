import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateEventForm() {
  const {eventId} = useParams();
  const [eventTitle, setEventTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
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
  const navigate = useNavigate();

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
        setSuccessMessage(" ");
        setTimeout(() =>
          {
             navigate (`/RSVP/${eventData.event_id}`);
          },1000);
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

  return (
    <>
 <div className="create-event"> 
          <div className = "create-form-container">
            <form className="create-form" onSubmit={handleUpdateSubmit }>

            <div className = "event-and-date">
              <div className='event-title'>
              <input 
                value={eventTitle} 
                className = "create-input-boxes" 
                onChange={(e) => { setEventTitle(e.target.value)}}
                placeholder = "Untitled Event"/> 

                
                  <div className="date">
                    <input  
                      type="date" 
                      value={date} 
                      className = "create-input-boxes" 
                      placeholder= "Set a date..." 
                      onChange={(e) => setDate(e.target.value)}/> 
                  </div>
               </div> 
            </div>
            

              <div className="name-attendees-time-location-description-container">
                <div className='host-name'>
                  <input 
                    value={hostName} 
                    className = "create-input-boxes" 
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder = "HOST NAME"
                  />
                </div>
                

                <div className="max-attendees">
                  <input 
                    value={attendees} 
                    className = "create-input-boxes" 
                    onChange={(e) => setAttendees(e.target.value)}
                    placeholder= "MAX ATTENDEES"
                  />
                </div>
                
                  <div className="time">
                    <input 
                      type="time" 
                      value={time}
                      className = "create-input-boxes time-input" 
                      onChange={(e) => setTime(e.target.value)}
                      placeholder = "Time"
                    />
                  </div>

                  <div className='location'>
                    <input 
                      value={location} 
                      className = "create-input-boxes" 
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder= "LOCATION"
                    />
                  </div>

                  <div className='description'>
                    <textarea
                      value={description} 
                      className = "create-input-boxes"
                      onChange={(e) => setDescription(e.target.value)}
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
                      value={publicPrivate} 
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
                  
                 {/* Submit Button */}
                <div className = "submit-button">
                  <button 
                    type="submit" 
                    className="create-save-button">UPDATE
                  </button>
                  
                  {successMessage && (
                  <>
                    {/* Background blur */}
                    <div className="background-blur"></div>

                    {/* Success message and congrats symbol */}
                    <div role="alert" className="alert">
                      <div>{successMessage}</div>
                    </div>

                    {/* Firework */}
                    <div className="firework">
                      <span className="emoji">🎉</span>
                    </div>
                  </>
                )}
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
                    value={contactInfo} 
                    className = "create-input-boxes" 
                    id='contactInfo'
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder = "Contact Info"
                  />
                </div>
              </div>
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
