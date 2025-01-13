import React from 'react';
import './AboutUs.css';
import profileImage1 from './Images/headshot.JPG';
import profileImageJennifer from './jenniferPerez-Juarez_Profile.jpg';
import profileImageTS from './Images/TS_headshot.png';
import profileImageTran from './Images/tran-photo.jpeg';
import profileImageSara from './Images/sara.jpg';

function AboutUs() {
    return (
        <div className="AboutUs">
            <div className="missionStatement">
                <div className="missionStatement-wrapper">
                    <h2>Our Mission</h2>
                    <p>Our mission is to curate unforgettable experiences by seamlessly connecting individuals and communities through innovative and diverse events. We strive to inspire and empower event organizers, fostering a platform that celebrates creativity, fosters meaningful connections, and leaves a lasting impact on every participant.</p>
                </div>
            </div>

            {/* Profile Sections */}
            <div className="profilesSection">
                <div className="profileContainer">
                    <div className="profileImages">
                        <img src={profileImage1} alt="Juana Casey" />
                    </div>
                    <div className="personInfo">
                        <h2>Juana Casey</h2>
                        <p>Hello, my name is Juana Casey! I am a second-year student at CUNY John Jay College of Criminal Justice, where I am majoring in Computer Science with a focus on Information Security. When I am not in school, you can usually find me at my computer working on video editing projects. I also enjoy creating floral arrangements and reading in my free time. I aspire to build a career in Front-End Development and Digital Forensics. </p>
                        <p>Feel free to connect with me on LinkedIn!</p>
                        <a href="https://www.linkedin.com/in/juana-casey/">LinkedIn</a>
                    </div>
                </div>

                <div className="profileContainer">
                    <div className="profileImages">
                        <img src={profileImageSara} alt="Sara Abdulla" />
                    </div>
                    <div className="personInfo">
                        <h2>Sara Abdulla</h2>
                        <p>I'm a sophomore at CUNY Lehman College and Macaulay Honors College studying Computer Graphics and Imaging with a minor in Media Communications Systems. I aspire to work in a space where I can leverage my creativity to craft designs and campaigns that deliver impactful experiences, connecting with and inspiring diverse audiences.</p>
                        <p>Let's Connect on LinkedIn!</p>
                        <a href="https://www.linkedin.com/in/sara-abdulla-0ba97b292">LinkedIn</a>
                    </div>
                </div>

                <div className="profileContainer">
                    <div className="profileImages">
                        <img src={profileImageJennifer} alt="Jennifer Perez-Juarez" />
                    </div>
                    <div className="personInfo">
                        <h2>Jennifer Perez-Juarez</h2>
                        <p>Hi, my name is Jennifer Perez-Juarez and I am currently a sopphmore studying computer science at CUNY Brooklyn College! One of my favorite things to do on campus is to find events on campus in search of free food and merchandise! Sometimes you'll even find me attending 2 - 3 events back-to-back on the same day! If you ever want to know the latest event to attend in hopes of gaining a free meal or merchandise to add to your collection, just reach out to me. </p>
                        <p>Connect with me on LinkedIn!</p>
                        <a href="http://www.linkedin.com/in/jennifer-perez-juarez" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>

                <div className="profileContainer">
                    <div className="profileImages">
                        <img src={profileImageTS} alt="Tanzina Sumona" />
                    </div>
                    <div className="personInfo">
                        <h2>Tanzina Sumona</h2>
                        <p>My name is Tanzina, and I am a sophomore at CCNY majoring in computer science. I am interested in learning about data science and analysis, or just working with large datasets and uncovering trends through predictive modeling</p>
                        <p>Connect with me on LinkedIn!</p>
                        <a href="https://www.linkedin.com/in/tanzina-sumona/">LinkedIn</a>
                    </div>
                </div>

                <div className="profileContainer">
                    <div className="profileImages">
                        <img src={profileImageTran} alt="Tran Vo" />
                    </div>
                    <div className="personInfo">
                        <h2>Tran Vo</h2>
                        <p> Hi, I’m Tran Vo! I’m currently studying Computer Science at BMCC,
                            and when I’m not buried in code or classwork, you’ll probably find
                            me hanging out with friends, exploring new restaurants, or getting
                            creative with art. I love painting with gouache or just sketching
                            whenever inspiration strikes.</p>
                        <a href="https://www.linkedin.com/in/tran-v-73812b321/">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
