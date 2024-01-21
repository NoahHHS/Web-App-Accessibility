import React, { Component } from "react";
import { useState } from "react";
import zxcvbn from "zxcvbn"; // Bibliotheek voor wachtwoordsterktemeting door Dropbox

import '../../stylesheets/RegistreerEnLogin.css'

//---------- Registreer Component ----------
export class Registreer extends Component {
    render() {
        return (
            <div className="registreer-pagina-container">
                <h1>Registreer</h1>
                <h2>Kies het type account dat u wilt maken</h2>
                <RegistreerForm />
            </div>
        );
    }
}

//---------- NormaalGebruikerForm Component ----------
const NormaalGebruikerForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [herhaalWachtwoord, setHerhaalWachtwoord] = useState('');

    // Add state hooks for error messages
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    //---------- Afhandeling van formulierinzending ----------
    const validateForm = () => {
        let isValid = true;

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Verkeerd email adres.');
            isValid = false;
        } else {
            setEmailError('');
        }

    // Password validation
    if (wachtwoord.length < 6) {
        setPasswordError('Wachtwoord moet minimaal 6 karakters lang zijn.');
        isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/.test(wachtwoord)) {
        setPasswordError('Wachtwoord moet minimaal 1 hoofdletter, 1 cijfer en 1 symbool bevatten.');
        isValid = false;
    } else {
        setPasswordError('');
    }

        // Confirm password validation
        if (wachtwoord !== herhaalWachtwoord) {
            setConfirmPasswordError('Wachtwoorden komen niet overeen.');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // If the form is valid, proceed with form submission
            const dataToSend = {
                type: 'NormaalGebruikerForm',
                email,
                wachtwoord
            };
            onSubmit(dataToSend);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Email input field */}
            <label htmlFor="email">Email:</label>
            <input
                className="input-form-field"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {/* Display email error message */}
            {emailError && <p className="error-message">{emailError}</p>}

            {/* Password input field */}
            <label htmlFor="wachtwoord">Wachtwoord:</label>
            <input
                className="input-form-field"
                placeholder="Wachtwoord"
                type="password"
                value={wachtwoord}
                onChange={(e) => setWachtwoord(e.target.value)}
                required
            />
            <WachtwoordSterkteMeterScript wachtwoord={wachtwoord} />
            {/* Display password error message */}
            {passwordError && <p className="error-message">{passwordError}</p>}

            {/* Confirm password input field */}
            <label htmlFor="herhaalWachtwoord">Herhaal wachtwoord:</label>
            <input
                className="input-form-field"
                placeholder="Herhaal wachtwoord"
                type="password"
                value={herhaalWachtwoord}
                onChange={(e) => setHerhaalWachtwoord(e.target.value)}
                required
            />
            {/* Display confirm password error message */}
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

            {/* Checkbox for algemene voorwaarden */}
            <label>
                <input
                    type="checkbox"
                    id="voorwaardenCheckbox"
                    required
                />
                <span className="inline-span-voorwaarden">Ik ga akkoord met de voorwaarden van
                    <a href="/privacystatement" target="_blank"><span> Accessibility</span></a>
                </span>
            </label>

            {/* Registratieknop */}
            <div className="center-register-button">
                <button className="registreer-button" type="submit">Registreer account</button>
            </div>
        </form>
    );
}

//---------- BedrijfsGebruikerForm Component ----------
const BedrijfsGebruikerForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [bedrijfsnaam, setBedrijfsnaam] = useState('');
    const [postcode, setPostCode] = useState('');
    const [straatnaam, setStraatnaam] = useState('');
    const [huisnummer, setHuisnummer] = useState('');
    const [toevoeging, setToevoeging] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [herhaalWachtwoord, setHerhaalWachtwoord] = useState('');

    // Add state hooks for error messages
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    //---------- Afhandeling van formulierinzending ----------
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form inputs
        const isValid = validateForm();

        if (isValid) {
            // If the form is valid, proceed with form submission
            const dataToSend = {
                type: 'GedrijfsGebruikerForm',
                email,
                bedrijfsnaam,
                postcode,
                straatnaam,
                huisnummer,
                toevoeging,
                wachtwoord,
            };

            onSubmit(dataToSend);
        }
    };

    const validateForm = () => {
        let isValid = true;

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Verkeerd email adres.');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (wachtwoord.length < 6) {
            setPasswordError('Wachtwoord moet minimaal 6 karakters lang zijn.');
            isValid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/.test(wachtwoord)) {
            setPasswordError('Wachtwoord moet minimaal 1 hoofdletter, 1 cijfer en 1 symbool bevatten.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        // Confirm password validation
        if (wachtwoord !== herhaalWachtwoord) {
            setConfirmPasswordError('Wachtwoorden komen niet overeen.');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    return (
    <form onSubmit={handleSubmit}>
        {/* Email invoerveld */}
        <label htmlFor="email">Email:</label>
        <input
        className="input-form-field"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        {/* Display email error message */}
        {emailError && <p className="error-message">{emailError}</p>}

        {/* Bedrijfsnaam invoerveld */}
        <label htmlFor="bedrijfsnaam">Bedrijfsnaam:</label>
        <input
        className="input-form-field"
        placeholder="Bedrijfsnaam"
        type="text"
        value={bedrijfsnaam}
        onChange={(e) => setBedrijfsnaam(e.target.value)}
        required
        />

        {/* Postcode invoerveld */}
        <label htmlFor="postcode">Postcode:</label>
        <input
        className="input-form-field"
        placeholder="Postcode"
        type="text"
        value={postcode}
        onChange={(e) => setPostCode(e.target.value)}
        required
        />

        {/* Straatnaam invoerveld */}
        <label htmlFor="straatnaam">Straatnaam:</label>
        <input
        className="input-form-field"
        placeholder="Straatnaam"
        type="text"
        value={straatnaam}
        onChange={(e) => setStraatnaam(e.target.value)}
        required
        />

        {/* Huisnummer invoerveld */}
        <label htmlFor="huisnummer">Huisnummer:</label>
        <input
        className="input-form-field"
        placeholder="Huisnummer"
        type="text"
        value={huisnummer}
        onChange={(e) => setHuisnummer(e.target.value)}
        required
        />

        {/* Toevoeging huisnummer invoerveld */}
        <label htmlFor="toevoeging">Toevoeging:</label>
        <input
        className="input-form-field"
        placeholder="Toevoeging huisnummer"
        type="text"
        value={toevoeging}
        onChange={(e) => setToevoeging(e.target.value)} />

        {/* Wachtwoord invoerveld */}
        <label htmlFor="wachtwoord">Wachtwoord:</label>
        <input
        className="input-form-field"
        placeholder="Wachtwoord"
        type="password"
        value={wachtwoord}
        onChange={(e) => setWachtwoord(e.target.value)}
        required
        />
        <WachtwoordSterkteMeterScript wachtwoord={wachtwoord} />
        {/* Display password error message */}
        {passwordError && <p className="error-message">{passwordError}</p>}

        {/* Herhaal wachtwoord invoerveld */}
        <label htmlFor="herhaalWachtwoord">Herhaal wachtwoord:</label>
        <input
        className="input-form-field"
        placeholder="Herhaal wachtwoord"
        type="password"
        value={herhaalWachtwoord}
        onChange={(e) => setHerhaalWachtwoord(e.target.value)} 
        required
        />
        {/* Display confirm password error message */}
        {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

        {/* Checkbox voor algemene voorwaarden */}
        <label>
            <input
                type="checkbox"
                id="voorwaardenCheckbox"
                required
            />
            <span className="inline-span-voorwaarden">Ik ga akkoord met de voorwaarden van
                <a href="/privacystatement" target="_blank"><span> Accessibility</span></a>
            </span>
        </label>

        {/* Registratieknop */}
        <div className="center-register-button">
            <button className="registreer-button" type="submit">Registreer account</button>
        </div>
    </form>
    );
};

// ---------- RegistreerForm Component ----------
const RegistreerForm = () => {
    const [isBedrijfsAccount, setIsBedrijfsAccount] = useState(false);
    const [isNormaalAccount, setIsNormaalAccount] = useState(true);

    // ---------- Toggle Bedrijfs Account ----------
    const handleToggleBedrijfsAccount = () => {
        setIsBedrijfsAccount(true);
        setIsNormaalAccount(false);
    };

    // ---------- Toggle Normaal Account ----------
    const handleToggleNormaalAccount = () => {
        setIsBedrijfsAccount(false);
        setIsNormaalAccount(true);
    };

    // ---------- Handle form submission ----------
    const handleSubmit = async (data) => {
        let endpoint = '';

        if (isBedrijfsAccount) {
            endpoint = 'https://localhost:7288/Registreer/Bedrijfsaccount';
        } else {
            endpoint = 'https://localhost:7288/Registreer/Account';
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Registration successful:', result);
            } else {
                const errorResult = await response.json();
                console.error('Registration failed:', errorResult);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="">
            {/* Checkbox voor Normaal Account */}
            <label>
                <input type="checkbox" checked={isNormaalAccount} onChange={handleToggleNormaalAccount} />
                <p className="inline-p-account-type">Ervaringsdeskundige account</p>
            </label>

            {/* Checkbox voor Bedrijfs Account */}
            <label>
                <input type="checkbox" checked={isBedrijfsAccount} onChange={handleToggleBedrijfsAccount} />
                <p className="inline-p-account-type">Bedrijfs account</p>
            </label>

            <div className="test">
                {isBedrijfsAccount ? (
                    <BedrijfsGebruikerForm onSubmit={handleSubmit} />
                ) : (
                    <NormaalGebruikerForm onSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
};

//---------- WachtwoordSterkteMeterScript Component ----------
const WachtwoordSterkteMeterScript = ({wachtwoord}) => {
    const testResult = zxcvbn(wachtwoord);
    const num = testResult.score * 100/4;
    // console.log(num);

    //---------- Genereer label voor wachtwoordsterkte ----------
    const createPassLabel = () => {
        switch(testResult.score) {
            case 0:
                return 'Erg zwak';
            case 1:
                return 'Zwak';
            case 2:
                return 'Matig';
            case 3:
                return 'Sterk';
            case 4:
                return 'Erg sterk';
            default:
                return '';
        }
    }
 
    //---------- Bepaal kleur van wachtwoordsterktebalk ----------
    const funcProgressColor = () => {
        switch(testResult.score) {
            case 0:
                return '#FFFFFF';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bc158';
            case 4:
                return '#00b500';
            default:
                return 'none';
        }
    }

    //---------- Bepaal stijl van wachtwoordsterktebalk ----------
    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
        height: '7px',
    })

    return(
        <>
            {/* Wachtwoordsterktebalk */}
            <div className="progress" style={{ height: '7px' }}>
                <div className="progress-bar" style={changePasswordColor()}></div>
            </div>

            {/* Wachtwoordsterkte label */}
            <p className="" style={{color: funcProgressColor()}}>{createPassLabel()}</p>
        </>
    );
}