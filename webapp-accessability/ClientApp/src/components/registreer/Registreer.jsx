import React, { Component } from "react";
import { useState } from "react";
import zxcvbn from "zxcvbn"; // gemaakt door dropbox

import '../../stylesheets/Registreer.css'


export class Registreer extends Component {
    render() {
        return(
            <div className="registreer-pagina-container">
                <h1>Registreer</h1>
                <h2>Kies het type account dat u wilt maken</h2>
                <RegistreerForm />
            </div>
        );
    }
}


const NormaalGebruikerForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [herhaalWachtwoord, setHerhaalWachtwoord] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation logic here before submitting
        onSubmit({ email, wachtwoord, herhaalWachtwoord });
      };

    return (
        <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                className="input-form-field"
                placeholder="Email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
                
                <label>Wachtwoord:</label>
                <input 
                className="input-form-field"
                placeholder="Wachtwoord"
                type="password" 
                value={wachtwoord} 
                onChange={(e) => setWachtwoord(e.target.value)} />  
                <WachtwoordSterkteMeterScript wachtwoord={wachtwoord} />

                <label>Herhaal wachtwoord:</label>
                <input 
                className="input-form-field"
                placeholder="Herhaal wachtwoord"
                type="password" 
                value={herhaalWachtwoord} 
                onChange={(e) => setHerhaalWachtwoord(e.target.value)} />


            <label>
                <input 
                type="checkbox" />
                <span className="inline-span-voorwaarden">Ik ga akkoort met de voorwaarden van 
                    <a href="/privacystatement" target="_blank"><span> Accessibility</span></a>
                </ span>
            </label>
            <div className="center-register-button">
                <button className="registreer-button" type="submit">Registreer account</button>
            </div>
        </form>
    );
}

const BedrijfsGebruikerForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [bedrijfsnaam, setBedrijfsnaam] = useState('');
    const [postcode, setPostCode] = useState('');
    const [straatnaam, setStraatnaam] = useState('');
    const [huisnummer, setHuisnummer] = useState('');
    const [toevoeging, setToevoeging] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [herhaalWachtwoord, setHerhaalWachtwoord] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation logic here before submitting
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
        <label>Email:</label>
        <input 
        className="input-form-field"
        placeholder="Email"
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} />

        <label>Bedrijfsnaam:</label>
        <input 
        className="input-form-field"
        placeholder="Bedrijfsnaam"
        type="text" 
        value={bedrijfsnaam} 
        onChange={(e) => setBedrijfsnaam(e.target.value)} />

        <label>Postcode:</label>
        <input 
        className="input-form-field"
        placeholder="Postcode"
        type="text" 
        value={postcode} 
        onChange={(e) => setPostCode(e.target.value)} />

        <label>Straatnaam:</label>
        <input 
        className="input-form-field"
        placeholder="Straatnaam"
        type="text" 
        value={straatnaam} 
        onChange={(e) => setStraatnaam(e.target.value)} />

        <label>Huisnummer:</label>
        <input 
        className="input-form-field"
        placeholder="Huisnummer"
        type="text" 
        value={huisnummer} 
        onChange={(e) => setHuisnummer(e.target.value)} />

        <label>Toevoeging:</label>
        <input 
        className="input-form-field"
        placeholder="Toevoeging huisnummer"
        type="text" 
        value={toevoeging} 
        onChange={(e) => setToevoeging(e.target.value)} />

        <label>Wachtwoord:</label>
        <input 
        className="input-form-field"
        placeholder="Wachtwoord"
        type="password" 
        value={wachtwoord} 
        onChange={(e) => setWachtwoord(e.target.value)} />  
        <WachtwoordSterkteMeterScript wachtwoord={wachtwoord} />

        <label>Herhaal wachtwoord:</label>
        <input 
        className="input-form-field"
        placeholder="Herhaal wachtwoord"
        type="password" 
        value={herhaalWachtwoord} 
        onChange={(e) => setHerhaalWachtwoord(e.target.value)} />

        <label>
            <input 
            type="checkbox" />
            <span className="inline-span-voorwaarden">Ik ga akkoort met de voorwaarden van 
                <a href="/privacystatement" target="_blank"><span> Accessibility</span></a>
            </ span>
            </label>
        <div className="center-register-button">
            <button className="registreer-button" type="submit">Registreer account</button>
        </div>
    </form>
    );
};

// ... (your existing code)

const RegistreerForm = () => {
    const [isBedrijfsAccount, setIsBedrijfsAccount] = useState(false);
    const [isNormaalAccount, setIsNormaalAccount] = useState(true);

    const handleToggleBedrijfsAccount = () => {
        setIsBedrijfsAccount(true);
        setIsNormaalAccount(false);
    };

    const handleToggleNormaalAccount = () => {
        setIsBedrijfsAccount(false);
        setIsNormaalAccount(true);
    };

    const handleSubmit = (data) => {
        // Handle form submission here, you can send the data to the server or perform further actions
        console.log('Registreer opgeslagen met data:', data);
    };

    return (
        <div className="">
            <label>
                <input type="checkbox" checked={isNormaalAccount} onChange={handleToggleNormaalAccount} />
                <p className="inline-p-account-type">Ervaringsdeskundige account</p>
            </label>
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

const WachtwoordSterkteMeterScript = ({wachtwoord}) => {
    const testResult = zxcvbn(wachtwoord);
    const num = testResult.score * 100/4;
    console.log(num);

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

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
        height: '7px',
    })

    return(
        <>
            <div className="progress" style={{ height: '7px' }}>
                <div className="progress-bar" style={changePasswordColor()}></div>
            </div>
            <p className="" style={{color: funcProgressColor()}}>{createPassLabel()}</p>
        </>
    );
}