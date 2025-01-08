import React from 'react'
import './AboutUs.css'
import profileImage1 from './profile_img.jpg'; // Import your profile images


function AboutUs() {
    return (
        
        <div className="AboutUs">
            <div className= "header">
                <h1>Our Mission</h1>
            </div>        
            <div className="missionStatement">
                <p>Our mission is to curate unforgettable experiences by seamlessly connecting individuals and communities through innovative and diverse events. We strive to inspire and empower event organizers, fostering a platform that celebrates creativity, fosters meaningful connections, and leaves a lasting impact on every participant.</p>
            </div>
            <div className="header">
                <h2>Meet the Creators!</h2>
            </div>
           <div className="container-1">
                <div className="profileImages-1">
                    <img src={profileImage1} alt="Person 1" />
                </div>
                <div className="personInfo-1">
                    <h2>Tanzina Sumona</h2>
                    <p>My name is Tanzina, and I am a sophomore at CCNY majoring in computer science. I am interested in learn more about data science and analysis, or just working with large datasets and uncovering trends through predictive modeling.</p>
                    <p>Connect with me on LinkedIn!</p>
                    <a href="https://www.linkedin.com/in/tanzina-sumona/">LinkedIn</a>
                </div>
           </div>  
        </div>
    ) 
}; 

export default AboutUs;