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
            setTimeout(() => window.location.replace("/create-event"), 4000);

           }
         }
        catch (err){
          console.log(err);
        }
      }

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setProfileImage(URL.createObjectURL(file));
        }
      };
      

      return (
        

      <div className="create-account">
        
        <div className="create-account-container">

          <div className='profile-header'>
              <h2> Create Your Profile</h2>
          </div>

          <form className="create-an-account-form" onSubmit={handleSubmit}>
      

          <div className='profile-img-change'>
            <div className="ppl-form-profile-image">
              <img 
                src={ProfileImage || profileImage1} 
                alt="Profile picture" 
                className="profile-image" 
              />
            </div>
            <label htmlFor="input-file">Upload image</label>
            <input 
              type="file" 
              accept="image/jpeg, image/png, image/jpg" 
              id="input-file" 
              onChange={handleImageChange} 
            />
        </div>

          
             {/* <label htmlFor="image-input">Enter image URL:</label> 
              <input 
                type="text" 
                id="image-input" 
                value={ProfileImage} 
                onChange={(e) => setProfileImage(e.target.value)} 
              />
            */}
            

          <div className="account-fill-in-info">
            {/* Name Input */}
            <div className="account-name">
              <label htmlFor="name-input">Name:</label>
              <input 
                type="text" 
                id="name-input" 
                value={Name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
      
            {/* Phone Number Input */}
            <div className="account-phone-number">
              <label htmlFor="phone-input">Phone Number:</label>
              <input 
                type="text" 
                id="phone-input" 
                value={Phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
      
            {/* Email Input */}
            <div className="account-email">
              <label htmlFor="email-input">Email:</label>
              <input 
                type="text" 
                id="email-input" 
                value={Email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            {/* Role Selection */}
            <div className="account-role">
              <label htmlFor="role-select">Are you an attendee or host?</label>
              <select id="role-select">
                <option value="Attendee">Attendee</option>
                <option value="Host">Host</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Links Section */}
            <div className="account-links">
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
              </div>
          </form>
        </div> 
    
    </div>

      );
      
      
}

export default CreateHost;