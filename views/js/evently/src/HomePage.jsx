import React from "react";
import {
  Link
} from "react-router-dom";
import './App.css'
import './HomePage.css'

const HomePage: React.FC = () => {
    return (
        
        <div className = "HomePage">
            <div id="MainText">
                <h2 className="Text"> Welcome To <span>event.ly!</span></h2>
                <p className="Home-P"> Where Socializing Meets Simplicity!</p>
               
               <div className="HostEvent">
                    <h2 className = "Text">Host your events here!</h2>
                    <Link to="/create-event" className="buttons">Get Started</Link>
                    <b />
                </div>

                <div className="FindEvent">
                    <h2 className = "Text">Find an event!</h2>
                    <Link to="/community-page" className="buttons">Browse</Link>
                </div>
            </div>
            <footer> All Rights Reserved - 2024 © Bitly </footer>
        </div>
    );
}

export default HomePage