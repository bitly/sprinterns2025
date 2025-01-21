import React from 'react';
import './AboutUs.css';
import profileImage1 from './Images/headshot.JPG';
import profileImageJennifer from './jenniferPerez-Juarez_Profile.jpg';
import profileImageTS from './Images/TS_headshot.png';
import profileImageTran from './Images/tran-photo.jpeg';
import profileImageSara from './Images/sara.jpg';
import bitlyArrow from './Images/bitlyArrow.png';


function AboutUs() {
    return (
        <div className="AboutUs">
            <div className="missionStatement">
                <div className="missionStatement-wrapper">
                    <h1>Our Mission</h1>
                    <p>Our mission is to curate unforgettable experiences by seamlessly connecting individuals and communities through innovative and diverse events. We strive to inspire and empower event organizers, fostering a platform that celebrates creativity, fosters meaningful connections, and leaves a lasting impact on every participant.</p>
                </div>
            </div>
            <div className="image-container">
                                <img src={bitlyArrow} alt="Bitly Arrow" className="bitly-arrow" />
                            </div>

            <div className="meet us">
                <div className="meet us-wrapper">
                    <h1>Meet the 2025 Bitly Sprinterns!</h1>
                </div>
            </div>

            {/* Profile Sections */}
            <div className="profilesSection">
                <div className="profileContainer">
                    <div className = "profileCard">
                        <div className="profileFront">
                            <img src={profileImage1} alt="Juana Casey" />
                            <h2>Juana Casey</h2>
                        </div>
                        <div className="profileBack">
                            <p>Hello, my name is Juana Casey! I am a second-year student at CUNY John Jay College of Criminal Justice, where I am majoring in Computer Science with a focus on Information Security. When I am not in school, you can usually find me at my computer working on video editing projects. I also enjoy creating floral arrangements and reading in my free time. I aspire to build a career in Front-End Development and Digital Forensics. </p>
                            <a href="https://www.linkedin.com/in/juana-casey/">Connect with me on LinkedIn!</a>
                        </div>
                    </div>  
                </div>

                <div className="profileContainer">
                    <div className="profileCard">
                        <div className="profileFront">
                            <img src={profileImageSara} alt="Sara Abdulla" />
                            <h2>Sara Abdulla</h2>
                        </div>
                        <div className="profileBack">
                            <p>Hi, I'm Sara! I'm a sophomore at CUNY Lehman College and Macaulay Honors College studying Computer Graphics and Imaging with a minor in Media Communications Studies. I hope to combine my creative and technical skills to pursue a career in product design. In my free time, I like to binge-watch shows, bake, visit new places, and spend time with family and friends.</p>
                            <a href="https://www.linkedin.com/in/sara-abdulla-0ba97b292">Connect with me on LinkedIn!</a>
                        </div>
                    </div>
                </div>

                <div className="profileContainer">
                    <div className="profileCard">
                        <div className="profileFront">
                            <img src={profileImageJennifer} alt="Jennifer Perez-Juarez" />
                            <h2>Jennifer Perez-Juarez</h2>
                        </div>
                        <div className="profileBack">
                            <p>Hi, my name is Jennifer Perez-Juarez and I am currently a sopphmore studying computer science at CUNY Brooklyn College! One of my favorite things to do on campus is to find events on campus in search of free food and merchandise! Sometimes you'll even find me attending 2 - 3 events back-to-back on the same day! If you ever want to know the latest event to attend in hopes of gaining a free meal or merchandise to add to your collection, just reach out to me. </p>
                            <a href="http://www.linkedin.com/in/jennifer-perez-juarez" target="_blank" rel="noopener noreferrer">Connect with me on LinkedIn!</a>
                        </div>
                    </div>
                </div>

                <div className="profileContainer">
                    <div className="profileCard">
                        <div className="profileFront">
                            <img src={profileImageTS} alt="Tanzina Sumona" />
                            <h2>Tanzina Sumona</h2>
                        </div>
                        <div className="profileBack">
                            <p>My name is Tanzina, and I am a sophomore at CCNY majoring in computer science. I am interested in learning about data science and analysis, or just working with large datasets and uncovering trends through predictive modeling</p>
                            <a href="https://www.linkedin.com/in/tanzina-sumona/">Connect with me on LinkedIn!</a>
                        </div>
                    </div>
                </div>

                <div className="profileContainer">
                    <div className="profileCard">
                        <div className="profileFront">
                            <img src={profileImageTran} alt="Tran Vo" />
                            <h2>Tran Vo</h2>
                        </div>
                        <div className="profileBack">
                            <p> Hi, I’m Tran Vo! I’m currently studying Computer Science at BMCC,
                                and when I’m not buried in code or classwork, you’ll probably find
                                me hanging out with friends, exploring new restaurants, or getting
                                creative with art. I love painting with gouache or just sketching
                                whenever inspiration strikes.</p>
                            <a href="https://www.linkedin.com/in/tran-v-73812b321/">Connect with me on LinkedIn!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
