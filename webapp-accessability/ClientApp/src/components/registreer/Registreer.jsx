import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import '../../stylesheets/RegistreerEnLogin.css';

export const Registreer = () => {
    return (
        <div className="registreer-pagina-container">
            <h1>Registreer</h1>
            <RegistreerForm />
        </div>
    );
};


    const RegistreerForm = () => {
        const [accountType, setAccountType] = useState('Ervaringsdeskundige');
        const [email, setEmail] = useState('');
        const [wachtwoord, setWachtwoord] = useState('');
        const [confirmWachtwoord, setConfirmWachtwoord] = useState('');
        const [straatnaam, setStraatnaam] = useState('');
        const [huisnummer, setHuisnummer] = useState('');
        const [toevoeging, setToevoeging] = useState('');
        const [postcode, setPostcode] = useState('');
        const [errorMessage, setErrorMessage] = useState('');
    
        const handleSubmit = async (e) => {
            e.preventDefault();
        
            if (wachtwoord !== confirmWachtwoord) {
                setErrorMessage('Wachtwoorden komen niet overeen.');
                return;
            }
        
            const registrationData = {
                email,
                wachtwoord,
                rol: accountType,
                straat: straatnaam,
                huisNr: parseInt(huisnummer, 10),
                toevoeging,
                postcode
            };
        
            try {
                const response = await fetch('https://localhost:7288/Registreer/Gebruiker', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(registrationData),
                });
        
                if (response.ok) {
                    const result = await response.json();
                    console.log('Registration successful:', result);
                    // Implement your post-registration logic here
                    window.location.href = '/';
                } else {
                    const errorResult = await response.json();
                    setErrorMessage(errorResult.message || 'Registratie mislukt');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setErrorMessage('Er is een fout opgetreden tijdens de registratie.');
            }
        };
    
    return (
        <form onSubmit={handleSubmit} className="registreer-form">
            <div className="center-register-button">
                {/* Radio buttons for account type */}
                <label>
                    <input 
                        type="radio" 
                        name="accountType" 
                        value="Ervaringsdeskundige" 
                        checked={accountType === 'Ervaringsdeskundige'}
                        onChange={() => setAccountType('Ervaringsdeskundige')}
                    /> Ervaringsdeskundige account
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="accountType" 
                        value="Bedrijf" 
                        checked={accountType === 'Bedrijf'}
                        onChange={() => setAccountType('Bedrijf')}
                    /> Bedrijfs account
                </label>
            </div>
    
            {/* Email input field */}
            <label htmlFor="email">Email:</label>
            <input
                className="input-form-field"
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
    
            {/* Password input field */}
            <label htmlFor="wachtwoord">Wachtwoord:</label>
            <input
                className="input-form-field"
                id="wachtwoord"
                placeholder="Wachtwoord"
                type="password"
                value={wachtwoord}
                onChange={(e) => setWachtwoord(e.target.value)}
                required
            />
            <WachtwoordSterkteMeterScript wachtwoord={wachtwoord} />
    
            {/* Confirm Password input field */}
            <label htmlFor="herhaalWachtwoord">Herhaal wachtwoord:</label>
            <input
                className="input-form-field"
                id="herhaalWachtwoord"
                placeholder="Herhaal Wachtwoord"
                type="password"
                value={confirmWachtwoord}
                onChange={(e) => setConfirmWachtwoord(e.target.value)}
                required
            />
    
            {/* Street Name input field */}
            <label htmlFor="straatnaam">Straatnaam:</label>
            <input
                className="input-form-field"
                id="straatnaam"
                placeholder="Straatnaam"
                type="text"
                value={straatnaam}
                onChange={(e) => setStraatnaam(e.target.value)}
                required
            />
    
            {/* House Number input field */}
            <label htmlFor="huisnummer">Huisnummer:</label>
            <input
                className="input-form-field"
                id="huisnummer"
                placeholder="Huisnummer"
                type="text"
                value={huisnummer}
                onChange={(e) => setHuisnummer(e.target.value)}
                required
            />
    
            {/* Addition input field */}
            <label htmlFor="toevoeging">Toevoeging:</label>
            <input
                className="input-form-field"
                id="toevoeging"
                placeholder="Toevoeging"
                type="text"
                value={toevoeging}
                onChange={(e) => setToevoeging(e.target.value)}
            />
    
            {/* Postal Code input field */}
            <label htmlFor="postcode">Postcode:</label>
            <input
                className="input-form-field"
                id="postcode"
                placeholder="Postcode"
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
            />
    
            {/* Terms and Conditions checkbox */}
            <label className="checkbox-voorwaarden">
                <input
                    type="checkbox"
                    id="voorwaardenCheckbox"
                    required
                />
                <span className="inline-span-voorwaarden">Ik ga akkoord met de voorwaarden van
                    <a href="/privacystatement" target="_blank"> Accessibility</a>
                </span>
            </label>
    
            {/* Display error message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
    
            {/* Register button */}
            <div className="center-register-button">
                <button className="registreer-button" type="submit">Registreer</button>
            </div>
        </form>
    );
};

const WachtwoordSterkteMeterScript = ({ wachtwoord }) => {
    const testResult = zxcvbn(wachtwoord);
    const num = testResult.score * 100 / 4;

    const createPassLabel = () => {
        switch (testResult.score) {
            case 0: return 'Erg zwak';
            case 1: return 'Zwak';
            case 2: return 'Matig';
            case 3: return 'Sterk';
            case 4: return 'Erg sterk';
            default: return '';
        }
    };

    const funcProgressColor = () => {
        switch (testResult.score) {
            case 0: return '#FFFFFF';
            case 1: return '#EA1111';
            case 2: return '#FFAD00';
            case 3: return '#9bc158';
            case 4: return '#00b500';
            default: return 'none';
        }
    };

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
        height: '7px',
    });

    return (
        <>
            <div className="progress" style={{ height: '7px' }}>
                <div className="progress-bar" style={changePasswordColor()}></div>
            </div>
            <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
        </>
    );
};