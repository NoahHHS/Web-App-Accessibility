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

    //---------- Afhandeling van formulierinzending ----------
    const handleSubmit = (e) => {
        e.preventDefault();
        // Voeg validatielogica hier toe voor het verzenden
        onSubmit({ email, wachtwoord, herhaalWachtwoord });
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

    //---------- Afhandeling van formulierinzending ----------
    const handleSubmit = (e) => {
        e.preventDefault();
        // Voeg validatielogica hier toe voor het verzenden
        onSubmit({
          email,
          bedrijfsnaam,
          postcode,
          straatnaam,
          huisnummer,
          toevoeging,
          wachtwoord,
          herhaalWachtwoord,
        });
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

// ... (your existing code)

//---------- RegistreerForm Component ----------
const RegistreerForm = () => {
    const [isBedrijfsAccount, setIsBedrijfsAccount] = useState(false);
    const [isNormaalAccount, setIsNormaalAccount] = useState(true);

    //---------- Toggle Bedrijfs Account ----------
    const handleToggleBedrijfsAccount = () => {
        setIsBedrijfsAccount(true);
        setIsNormaalAccount(false);
    };

    //---------- Toggle Normaal Account ----------
    const handleToggleNormaalAccount = () => {
        setIsBedrijfsAccount(false);
        setIsNormaalAccount(true);
    };

    //---------- Handle form submission ----------
    const handleSubmit = (data) => {
        // Behandel hier de formulierinzending, stuur de gegevens naar de server of voer verdere acties uit
        console.log('Registreer opgeslagen met data:', data); //komt in console in browser
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