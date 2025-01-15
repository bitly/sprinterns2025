import React, {useState} from 'react'
import './CreateHost.css'
import profileImage1 from "./profile_img.jpg"

function CreateHost() {
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Link, setLink] = useState("");
    const [ProfileImage, setProfileImage] = useState("");
    const [successMessage, setSuccessMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          let res = await fetch("http://localhost:3000/api/hosts", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
              first_name: Name, phone_number: Phone, email: Email, image_url: Link
            }),
          });
          if (res.status === 201) {
            setSuccessMessage("Host Profile created!")
            setTimeout(window.location.replace("/create-event"), 4000);
           }
         }
        catch (err){
          console.log(err);
        }
      }

      return (
        
        <div className="create-host-container">
          <form className="create-form" onSubmit={handleSubmit}>
            <h2>Create Your Profile</h2>
      
            {/* Profile Image Section */}
            <div className="form-group">
              <img 
                src={profileImage1} 
                alt="Profile picture" 
                className="profile-image" 
              />
              <label htmlFor="image-input">Enter image URL:</label>
              <input 
                type="text" 
                id="image-input" 
                value={ProfileImage} 
                onChange={(e) => setProfileImage(e.target.value)} 
              />
            </div>
      
            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="name-input">Name:</label>
              <input 
                type="text" 
                id="name-input" 
                value={Name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
      
            {/* Phone Number Input */}
            <div className="form-group">
              <label htmlFor="phone-input">Phone Number:</label>
              <input 
                type="text" 
                id="phone-input" 
                value={Phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
      
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email-input">Email:</label>
              <input 
                type="text" 
                id="email-input" 
                value={Email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            {/* Role Selection */}
            <div className="form-group">
              <label htmlFor="role-select">Are you an attendee or host?</label>
              <select id="role-select">
                <option value="Attendee">Attendee</option>
                <option value="Host">Host</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Links Section */}
            <div className="form-group">
              <label htmlFor="link-input">Add any links (Optional):</label>
              <input 
                type="text" 
                id="link-input" 
                value={Link} 
                onChange={(e) => setLink(e.target.value)} 
              />
            </div>

            {/* Submit Button */}
            <button className="button" type="submit">Create Account</button>
          </form>
        </div>
      );
      
      
}

export default CreateHost;