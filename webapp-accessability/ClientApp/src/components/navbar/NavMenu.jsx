import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//---------------------------- Variables and State ----------------------------
let singedIn = false; // hardcoded state of de user ingelogd is op het moment

//---------------------------- Parent Component ----------------------------
const NavMenu = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark' style={{ backgroundColor: 'rgb(29, 35, 79)', borderBottom: '0.4mm solid black', marginBottom: '15px', zIndex: '99' }}>
            <a className='title' href="#">Access-Ability</a>
            <Hamburger />
            <Navitems />
        </nav>
    );
}

//---------------------------- NavMenu components ----------------------------
const Hamburger = () => {
    return (
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    );
}

const Navitems = () => {
    return (
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <a className='nav-item' href="/onderzoek">Onderzoek</a>
                <a className='nav-item' href="/profiel">Profiel</a>
                <a className='nav-item' href="/overons">Over Ons</a>
                <a className='nav-item' href="/privacystatement">Privacy</a>
            </div>
            <ButtonLogIn />
        </div>
    );
}

const ButtonLogIn = () => {
    if(singedIn === false){
        return(
            <div className='loginContainer'>
                <button className='loginButton'><strong>Login</strong></button>
            </div>
            
        );
    }
    else{
        return;
    }
}

//---------------------------- Export ----------------------------
export default NavMenu;