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
                    <h2>Sprintern 1</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quas, sapiente, dignissimos eveniet provident non error, beatae dolorum cum doloremque molestias? Repudiandae sint saepe suscipit! Magnam saepe accusantium ullam aliquid labore debitis. Nulla culpa dicta repellat ex temporibus soluta magnam. Nostrum adipisci optio pariatur omnis dolorum voluptate! Tempore, aut. Veritatis?</p>
                    <p>Connect with me on LinkedIn!</p>
                    <a href="#">LinkedIn</a>
                </div>
           </div>  
        </div>
    ) 
}; 

export default AboutUs;