import React, { Component } from 'react';
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
















// negeer dit is later voor forms groetjes noah



// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
  
//     const handleSubmit = (event) => {
//       event.preventDefault(); // Prevents the default form submission behavior
  
//       // You can perform any additional logic here before submitting the form
//       console.log('Submitting form with email:', email, 'and password:', password);
  
//       // Add your actual form submission logic here
//     };

//     return (
//         <div className='login-container'>
//         <form onSubmit={handleSubmit}>
//         <div className="login-form-container">
//             <label htmlFor="email"><b>Email</b></label>
//             <input
//               type="email"
//               placeholder="Vul email in"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
  
//             <label htmlFor="wachtwoord"><b>Wachtwoord</b></label>
//             <input
//               type="password"
//               placeholder="Wachtwoord"
//               name="wachtwoord"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
  
//             <button type="submit">Login</button>
//             <label>
//               <input type="checkbox" name="remember" /> Remember me
//             </label>
//           </div>
//         </form>
//       </div>
//     );
// }



//             <label htmlFor="email">Email</label>
//             <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@email.nl" id="email" name="email"/>
//             <label htmlFor="password">Password</label>
//             <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Wachtwoord" id="password" name="password"/>
//             <button type="submit">Log In</button>


// ---------------------------------------------------------------------------------
// import React, { useState } from 'react';


// export const Login = () => {
//     return (
//         <div className="login-form-container">

//         </div>

//     )
// }


// youtube tutorial login pagina met useState chickie die praat
// return (
//     <div className="auth-form-container">
//         <h2>Login</h2>
//         <form className="login-form" onSubmit={handleSubmit}>
//             <label htmlFor="email">Email</label>
//             <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@email.nl" id="email" name="email"/>
//             <label htmlFor="password">Password</label>
//             <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Wachtwoord" id="password" name="password"/>
//             <button type="submit">Log In</button>
//         </form>
//     </div>
// )





// login tutorial weSchool gecombineerd met tutorial chickie die praat https://www.w3schools.com/howto/howto_js_password_validation.asp
{/* <h2>Login</h2>
<form className="login-form">
    <label htmlFor="email">Email</label>
    <input type="email" placeholder="example@email.nl" id="email" name="email"/>

    <label htmlFor="wachtwoord">Wachtwoord</label>
    <input type="password" placeholder="Wachtwoord" id="wachtwoord" name="wachtwoord" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Moet minstens één cijfer en één hoofdletter en kleine letter bevatten, en minstens 8 of meer tekens." required/>
    
    <button type="submit">Log In</button>
</form>
<div id="message">
    <h3>Wachtwoord moet het volgende bevatten:</h3>
    <p id="letter" class="invalid">A <b>Kleine letter</b> letter</p>
    <p id="capital" class="invalid">A <b>Hoofdletter (uppercase)</b> letter</p>
    <p id="number" class="invalid">A <b>Nummer</b></p>
    <p id="length" class="invalid">Minimaal <b>8 characters</b></p>
</div> */}
