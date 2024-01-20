import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { User } from 'react-feather';

//---------------------------- Variables and State ----------------------------
let signedIn = false; // hardcoded state of de user ingelogd is op het moment


//---------------------------- Parent Component ----------------------------
const NavMenu = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark' style={{ backgroundColor: 'rgb(29, 35, 79)', borderBottom: '0.4mm solid black', marginBottom: '15px', zIndex: '99' }}>
            <a className='title' title='Homepage Access-Ability' href="/">Access-Ability</a>
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
                <a className='nav-item' title='Ga naar de onderzoekspagina' href="/onderzoek">Onderzoek</a>
                <a className='nav-item' title='Ga naar je profielspagina' href="/profiel">Profiel</a>
                <a className='nav-item' title='Leer meer over ons' href="/overons">Over Ons</a>
                <a className='nav-item' title='Krijg inzicht op je privacy' href="/privacystatement">Privacy</a>
            </div>
            <ButtonLogIn />
        </div>
    );
}

const ButtonLogIn = () => {
    if(signedIn === false){
        return(
            <div className='loginContainer'>
                <a href="/login">
                    <button className='Navbar-Button Loginbutton' title='Klik hier om in te loggen'><strong>Login</strong></button>
                </a>
                <a href="/registreer">
                    <button className='Navbar-Button Registreerbutton' title='Klik hier om een account te maken'><strong>Registreer</strong></button>
                </a>
            </div>
            
        );
    }
    else{
        return(
            <div className='loginContainer'>
                <User className='iconNav'/>
            </div>
        );
    }
}

//---------------------------- Export ----------------------------
export default NavMenu;