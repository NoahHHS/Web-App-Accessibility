import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavMenu = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark' style={{ backgroundColor: 'rgb(29, 35, 79)', borderBottom: '0.4mm solid black', marginBottom: '15px', zIndex: '99' }}>
            <a className='title' href="#">Access-Ability</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className='nav-item' href="#">item1</a>
                    <a className='nav-item' href="#">item2</a>
                    <a className='nav-item' href="#">item3</a>
                    <a className='nav-item' href="#">item4</a>
                </div>
            </div>
        </nav>
    );
}

export default NavMenu;