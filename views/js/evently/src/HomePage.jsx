import React from "react";
import {
  Link
} from "react-router-dom";
import './App.css'
import './HomePage.css'
import bitlyAnimals from './Images/bitlyAnimals.png';
import PlusSymbol from './plus.svg';


const HomePage = () => {
    return (
        
        <div className = "HomePage">
            <div id="MainText">
                <h2 className="Text"> Join <span>event.ly</span> Today!</h2>
                <p className="Home-P"> Where Socializing Meets Simplicity</p>
                <br>
                </br>
                <div className="image-container">
                    <img src={bitlyAnimals} alt="Bitly Animals" className="bitly-animals" />
                </div>
               <div className="HostEvent">
                    <Link to="/create-event" className="buttons">
                    Create Event
                    <img src={PlusSymbol} alt="Plus Symbol" className= "plus" />

                    </Link>
                    
                   
                </div>
            </div>
            <footer> All Rights Reserved - 2025 © Bitly | Designed by Bitly Sprinterns </footer>
        </div>
    );
}

export default HomePage