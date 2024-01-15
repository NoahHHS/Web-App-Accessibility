import React, { Component } from "react";
import { useState } from "react";

import zxcvbn from "zxcvbn"; // gemaakt door dropbox

import '../../stylesheets/Registreer.css'

export class Registreer extends Component {
    render() {
        return(
            <div>
                <RegistreerTitel />
            </div>
        );
    }
}

const RegistreerTitel = () => {
    const [password, setPassword] = useState('');
    console.log(password);
    
    return (
        <div className="registreer-pagina-container">
            <div className="registreer-titel-container">
                <h1>Registreer</h1>
            </div>
            <div className="registreer-form-container">
                <div className="registreer-invul-gegevens">
                    <p className='email-registreer-input'>Email</p>
                    <input
                    className='input-gegevens-registreer'
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    required
                    />

                    <div className="col-md-6-mx-auto">
                        <div className="form-group mb-1">
                        <p className='wachtwoord-registreer-input'>Wachtwoord</p>
                        <input 
                        className="input-gegevens-registreer" 
                        type="password" 
                        placeholder="Wachtwoord"
                        name="wachtwoord"
                        required
                        onChange={e => setPassword(e.target.value)}
                        />
                        </div>
                        <WachtwoordSterkteMeterScript password={password}/>
                    </div>                   

                    <p className='wachtwoord-herhaal-registreer-input'>Herhaal Wachtwoord</p>
                    <input
                    className='input-gegevens-registreer'
                    type="password"
                    placeholder="Herhaal wachtwoord"
                    name="herhaalWachtwoord"
                    required
                    />
                </div>


                <div className="registreer-voorwaarden-gegevens">
                    <label className='checkbox-label'><input className='checkbox-registreer' type="checkbox" name="voorwaarden" /><p className='checkbox-text'>Ik ga akkoort met de voorwaarden van <a href="/privacystatement" target="_blank">Accessibility</a><br /> en het verwerken van mijn persoonsgegevens.</ p></label>
                </div>
                <div className="registreer-maak-account">
                    <button id='registreer-button' type="submit">Maak account aan</button>
                </div>
            </div>
        </div>
    );
}

const WachtwoordSterkteMeterScript = ({password}) => {

    const testResult = zxcvbn(password);
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
                return '#828282';
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
            <p className="wachtwoord-sterkte-text" style={{color: funcProgressColor}}>{createPassLabel()}</p>
        </>
    );
}