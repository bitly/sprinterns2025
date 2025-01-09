import React from 'react'
import './AboutUs.css'
import profileImage1 from 'jenniferPerez-Juarez_Profile.jpg'; // Import your profile images


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
                    <img src={profileImage1} alt="Jennifer Perez-Juarez" />
                </div>
                <div className="personInfo-1">
                    <h2>Jennifer Perez-Juarez</h2>
                    <p>Hi, my name is Jennifer Perez-Juarez and I am currently a sopphmore studying computer science at CUNY Brooklyn College! One of my favorite things to do on campus is to find events on campus in search of free food and merchandise! Sometimes you'll even find me attending 2 - 3 events back-to-back on the same day! If you ever want to know the latest event to attend in hopes of gaining a free meal or merchandise to add to your collection, just reach out to me. </p>
                    <p>Connect with me on LinkedIn!</p>
                    <a href="http://www.linkedin.com/in/jennifer-perez-juarez" target="_blank">LinkedIn</a>
                </div>
           </div>  
        </div>
    ) 
}; 

export default AboutUs;