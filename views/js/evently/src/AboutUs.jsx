import React from 'react';
import './AboutUs.css';
import profileImage1 from './Images/headshot.JPG';
import profileImageJennifer from './jenniferPerez-Juarez_Profile.jpg';
import profileImageTS from './Images/TS_headshot.png';
import profileImageTran from './Images/tran-photo.jpeg';
import profileImageSara from './Images/sara.jpg';

function AboutUs() {
    return (
        <>
            <div className="AboutUs">
                {/* Mission Section */}
                <MissionSection />
                
                {/* Profiles Section */}
                <ProfilesSection />
            </div>
        </>
    );
}

// Mission Section Component
const MissionSection = () => {
    return (
        <div className="missionSection">
            <div className="missionStatement">
                <div className="missionStatement-wrapper">
                    <h3>Our Mission</h3>
                    <p>
                        Our mission is to curate unforgettable experiences by seamlessly
                        connecting individuals and communities through innovative and diverse
                        events. We strive to inspire and empower event organizers, fostering a
                        platform that celebrates creativity, fosters meaningful connections, and
                        leaves a lasting impact on every participant.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Profiles Section Component
const ProfilesSection = () => {
    return (
        <div className = "profileSection-wrapper"> 
            <div className="profilesSection">
                <ProfileContainer 
                    image={profileImage1} 
                    name="Juana Casey" 
                    description="Hello, my name is Juana Casey! I am a second-year student at CUNY John Jay College of Criminal Justice, where I am majoring in Computer Science with a focus on Information Security. When I am not in school, you can usually find me at my computer working on video editing projects. I also enjoy creating floral arrangements and reading in my free time. I aspire to build a career in Front-End Development and Digital Forensics."
                    linkedinUrl="https://www.linkedin.com/in/juana-casey/"
                />
                <ProfileContainer 
                    image={profileImageSara} 
                    name="Sara Abdulla" 
                    description="I'm a sophomore at CUNY Lehman College and Macaulay Honors College studying Computer Graphics and Imaging with a minor in Media Communications Systems. I aspire to work in a space where I can leverage my creativity to craft designs and campaigns that deliver impactful experiences, connecting with and inspiring diverse audiences."
                    linkedinUrl="https://www.linkedin.com/in/sara-abdulla-0ba97b292"
                />
                <ProfileContainer 
                    image={profileImageJennifer} 
                    name="Jennifer Perez-Juarez" 
                    description="Hi, my name is Jennifer Perez-Juarez and I am currently a sophomore studying computer science at CUNY Brooklyn College! One of my favorite things to do on campus is to find events on campus in search of free food and merchandise! Sometimes you'll even find me attending 2 - 3 events back-to-back on the same day! If you ever want to know the latest event to attend in hopes of gaining a free meal or merchandise to add to your collection, just reach out to me."
                    linkedinUrl="http://www.linkedin.com/in/jennifer-perez-juarez"
                />
                <ProfileContainer 
                    image={profileImageTS} 
                    name="Tanzina Sumona" 
                    description="My name is Tanzina, and I am a sophomore at CCNY majoring in computer science. I am interested in learning about data science and analysis, or just working with large datasets and uncovering trends through predictive modeling."
                    linkedinUrl="https://www.linkedin.com/in/tanzina-sumona/"
                />
                <ProfileContainer 
                    image={profileImageTran} 
                    name="Tran Vo" 
                    description="Hi, I’m Tran Vo! I’m currently studying Computer Science at BMCC, and when I’m not buried in code or classwork, you’ll probably find me hanging out with friends, exploring new restaurants, or getting creative with art. I love painting with gouache or just sketching whenever inspiration strikes."
                    linkedinUrl="https://www.linkedin.com/in/tran-v-73812b321/"
                />
            </div>
        </div>
    );
};

// ProfileContainer Component
const ProfileContainer = ({ image, name, description, linkedinUrl }) => {
    return (
        <div className="container-1">
            <div className="profileImages-1">
                <img src={image} alt={name} />
            </div>
            <div className="personInfo-1">
                <h2>{name}</h2>
                <p>{description}</p>
                <p>Connect with me on LinkedIn!</p>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
        </div>
    );
};

export default AboutUs;