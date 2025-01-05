import React from 'react'
import './AboutUs.css'
import profileImage1 from './profile_img.jpg'; // Import your profile images
import profileImage2 from './Lameya.jpg';
import profileImage3 from './sanjida.jpeg';
import IdenAmoako from './Images/IdenAmoako.jpeg'
import profileImage4 from './VidiyaDawah.jpg';


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
                    <h2>Safiya Jones</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quas, sapiente, dignissimos eveniet provident non error, beatae dolorum cum doloremque molestias? Repudiandae sint saepe suscipit! Magnam saepe accusantium ullam aliquid labore debitis. Nulla culpa dicta repellat ex temporibus soluta magnam. Nostrum adipisci optio pariatur omnis dolorum voluptate! Tempore, aut. Veritatis?</p>
                    <p>Connect with me on LinkedIn!</p>
                    <a href="#">LinkedIn</a>
                </div>
           </div>
           <div className="container-2">
                <div className="profileImages-2">
                    <img src={profileImage2} alt="Person 1" />
                </div>
                <div className="personInfo-2">
                    <h2>Lameya Mostafa</h2>
                    <p>Hi! I am Lameya. I'm currently a sophomore at Hunter College, pursuing a degree in Computer Science. Outside of academics, I enjoy watching sunsets and rocket launches. Photography and video editing are also among my favorite hobbies, allowing me to capture and create moments. I'm always eager to expand my knowledge and explore new interests. </p>
                    <p>Connect with me on LinkedIn!</p>
                    <a href="https://www.linkedin.com/in/lameya-mostafa-3773a5271/">LinkedIn</a>
                </div>
           </div>
           <div className="container-1">
                <div className="profileImages-1">
                    <img src={profileImage3} alt="Person 1" />
                </div>
                <div className="personInfo-1">
                    <h2>Sanjida Kazi</h2>
                    <p> Hello! I'm currently a freshman at Hunter College majoring in computer science. I am Bengali-American and live in the Bronx. In my free time, I like to watch shows, cook, and play guitar. I am glad to be apart of the sprinternship at Bitly this year, it was a great learning experience and I got to meet so many talented people. </p>
                    <p>Add me on LinkedIn!</p>
                    <a href="https://www.linkedin.com/in/sanjida-kazi-a71a5b2a0/">LinkedIn</a>
                </div>
           </div>
           <div className="container-2">
                <div className="profileImages-2">
                    <img src={profileImage4} alt="Person 1" />
                </div>
                <div className="personInfo-2">
                    <h2>Vidiya Dawah</h2>
                    <p>Hello! I'm Vid, a junior at Baruch majoring in CIS who has interned here at Bitly! I like learning new things and this experience has taught me a lot of technical skills and a lot of things about myself. And I got to meet a lot of cool people here at Bitly.</p>
                    <p>Let's link up on LinkedIn</p>
                    <a href="https://www.linkedin.com/in/vidiya-dawah-79a783282/">LinkedIn</a>
                </div>
           </div>
           <div className="container-1">
                <div className="profileImages-1">
                    <img src={IdenAmoako} alt="Picture of Iden Amoako" />
                </div>
                <div className="personInfo-1">
                    <h2>Iden Amoako</h2>
                    <p> Hi, I'm Iden. I am a third year undergraduate student pursuing a Bachelor of Business Administration in Computer Information Systems at Baruch College, with a minor in Interdisciplinary Studies at The Macaulay Honors College. 
                        I am an aspriring Software Engineer/Full Stack Developer & Technical Product Manager.
                        </p>
                    <p>Connect with me on LinkedIn!</p>
                    <a href="https://www.linkedin.com/in/iden-amoako/">LinkedIn</a>
                </div>
           </div>    
        </div>
    ) 
}; 

export default AboutUs;