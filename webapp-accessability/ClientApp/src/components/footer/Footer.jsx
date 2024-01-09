import React from 'react';
// ---------------------------------------Parent Components---------------------------------------

const CustomFooter = () => {
    return (
        <div className='footer'>
                <FooterNav />
                <FooterContact />
                <FooterSocials />
        </div>
    );
};

// ---------------------------------------Child Components---------------------------------------

const FooterContact = () => {
    return (
        <div className='footerContact-container'>
            <h2 id='contact'>Contact</h2>
            <div className='contact-items'>
                <a>
                    <span id='contact-info'>030 - 239 82 70</span>
                </a>
                <br />
                <a>
                    <span id='contact-info'>info@accessibility.nl</span>
                </a>
            </div>
        </div>
    );
};

const FooterNav = () => {
    return (
        <div className='footerNav-Container'>
            <h2 id='contact'>Site Links</h2>
            <ul className='nav-list'>
                <li className='nav-bullets'><span className='nav-items'>Home</span></li>
                <li className='nav-bullets'><span className='nav-items'>Over ons</span></li>
                <li className='nav-bullets'><span className='nav-items'>Privacy Statement & Cookies</span></li>
            </ul>
        </div>
    );
};

const FooterSocials = () => {
    return (
        <div className='socialNav-Container'>
            {/*https://ionic.io/ library voor icons + tutorial https://www.youtube.com/watch?v=Hskt1jN7JTc&ab_channel=dcode*/}
            {/* <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script> */}
            <ul className='socials-list'>
                <li className='socials-bol'><a className='socials-link' href='https://nl.linkedin.com/company/accessibilitynl' target='_blank'>linkedin{/*<ion-icon className='linkedin' name="logo-linkedin"></ion-icon>*/}</a></li>
                <li className='socials-bol'><a className='socials-link' href='https://twitter.com/AccessibilityNL' target='_blank'>Twitter{/*<ion-icon className='twitter' name="logo-twitter"></ion-icon>*/}</a></li>
                <li className='socials-bol'><a className='socials-link' href='https://www.youtube.com/channel/UCSFsnRBNIDCgYJEW_ZLfTrg' target='_blank'>YouTube{/*<ion-icon className='youtube' name="logo-youtube"></ion-icon>*/}</a></li>
            </ul>
        </div>
    );
};

export default CustomFooter;