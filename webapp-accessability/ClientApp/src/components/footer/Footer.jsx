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

const FooterNav = () => {
    return (
        <div className='footerNav-Container'>
            <h2 id='footerContact'>Site Links</h2>
            <ul id='ulContact-link'>
                <li className='footerNav-bullets'><a className='footerContact-link' title='Ga naar de homepagina' href='#'>Home</a></li>
                <li className='footerNav-bullets'><a className='footerContact-link' title='Leer meer over ons' href='overons'>Over Ons</a></li>
                <li className='footerNav-bullets'><a className='footerContact-link' title='Leer hoe we met je gegevens omgaan' href='privacystatement'>Privacy Statement & Cookies</a></li>
            </ul>
        </div>
    );
};

const FooterContact = () => {
    return (
        <div className='footerContact-container'>
            <h2 id='footerContact' title='Onze contactgegevens'>Contact</h2>
            <div className='contact-items'>
                    <span className='contact-info'>Telefoon: 030 - 239 82 70</span>
                <br />
                    <span className='contact-info'>Contact: info@accessibility.nl</span>
            </div>
        </div>
    );
};

const FooterSocials = () => {
    return (
        <div className='socialNav-Container'>
            <a className='socials-link' href='https://nl.linkedin.com/company/accessibilitynl' target="_blank">
                <div className='socials-circle'>
                    <img className='socials-picture' title='ga naar LinkedIn' src="../../../Assets/LinkedIn-logo.png" alt="LinkedIn logo" />
                </div>
            </a>
            <a className='socials-link' href='https://twitter.com/AccessibilityNL' target="_blank">
                <div className='socials-circle'>
                    <img className='socials-picture' title='ga naar Twitter' src="../../../Assets/twitter-logo.png" alt="twitter logo" />
                </div>
            </a>
            <a className='socials-link' href='https://www.youtube.com/channel/UCSFsnRBNIDCgYJEW_ZLfTrg' target="_blank">
                <div className='socials-circle'>
                    <img className='socials-picture' title='ga naar Youtube' src="../../../Assets/youtube-logo.png" alt="youtube logo" />
                </div>
            </a>
        </div>
    );
};


{/* <ul className='socials-list'>
<li className='socials-bol'><a className='socials-link' href='https://nl.linkedin.com/company/accessibilitynl' target='_blank'></a></li>
<li className='socials-bol'><a className='socials-link' href='https://twitter.com/AccessibilityNL' target='_blank'>Twitter</a></li>
<li className='socials-bol'><a className='socials-link' href='https://www.youtube.com/channel/UCSFsnRBNIDCgYJEW_ZLfTrg' target='_blank'>YouTube</a></li>
</ul> */}

export default CustomFooter;