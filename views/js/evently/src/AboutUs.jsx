import React from 'react'
import './AboutUs.css'
import profileImage1 from './Images/headshot.JPG'; // Import your profile images


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
                    <h2>Juana Casey</h2>
                    <p>Hello, my name is Juana Casey! I am a second-year student at CUNY John Jay College of Criminal Justice, where I am majoring in Computer Science with a focus on Information Security. When I am not in school, you can usually find me at my computer working on video editing projects. I also enjoy creating floral arrangements and reading in my free time. I aspire to build a career in Front-End Development and Digital Forensics. </p>
                    <p> Feel free to connect with me on LinkedIn!</p>
                    <a href="https://www.linkedin.com/in/juana-casey/">LinkedIn</a>
                </div>
           </div>  
        </div>
    ) 
}; 

export default AboutUs;