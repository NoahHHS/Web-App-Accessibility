import { useState } from "react";
import '../../stylesheets/RegistreerEnLogin.css'

//---------- Login Component ----------
export const Login = () => {
  return (
    <div className="registreer-pagina-container">
        <h1>Login</h1>
        <GebruikerInlogForm />
        <LoginOpties />
        <GoogleLogin />
    </div>
  );
};

//---------- GebruikerInlogForm Component ----------
const GebruikerInlogForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    
    //---------- Afhandeling van formulierinzending ----------
    const handleSubmit = (e) => {
        e.preventDefault();
        // Voeg validatielogica hier toe voor het verzenden
        onSubmit({ email, wachtwoord});
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

            {/* Checkbox voor het onthouden van het wachtwoord */}
            <label>
                <input 
                type="checkbox" 
                id="voorwaardenCheckbox"
                required
                />
                <span>Onthoud wachtwoord </span>
            </label>

            {/* Login knop */}
            <div className="center-register-button">
                <button className="registreer-button" type="submit">Login</button>
            </div>
        </form>
    );
}

//---------- LoginOpties Component ----------
const LoginOpties = () => {
    return (
        <div className='login-opties-container'>
            {/* Link naar wachtwoord vergeten pagina */}
            <div className='wachtwoord-vergeten-container'>
                <p className='login-wachtwoord-vergeten'>Wachtwoord vergeten? <a className='login-opties-text' href='/wachtwoordvergeten'>Klik hier</ a></p>
            </div>
            
            {/* Link naar registratiepagina */}
            <div className='registreer-account-container'>
                <p className='login-geen-account'>Geen account? <a className='login-opties-text' href='/registreer'>Maak er hier een</ a></p>
            </div>
        </div>
    );
}

//---------- GoogleLogin Component ----------
const GoogleLogin = () => {
    return (
        <div className='google-login-container'>
            <button id='google-login-button'>Login met Google</button>
        </div>  
    );
}