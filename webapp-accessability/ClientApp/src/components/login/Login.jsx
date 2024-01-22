import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../stylesheets/RegistreerEnLogin.css';

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
    const navigate = useNavigate(); // Create a navigate function

    //---------- Afhandeling van formulierinzending ----------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Request Data:", { email, wachtwoord });

            const response = await axios.post(
                "https://localhost:7288/Login",
                { email, wachtwoord },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            // Assuming a successful login if the status code is 200
            if (response.status === 200) {
                // Perform client-side redirection
                navigate('/'); 
            }

            // Call the parent onSubmit callback if provided
            if (onSubmit) {
                onSubmit({ email, wachtwoord });
            }
        } catch (error) {
            // Handle login error
            console.error("Login failed:", error.message);
        }
    };

    //ZONDER AXIOS
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //         console.log("Request Data:", { email, wachtwoord });
    
    //         const response = await fetch("https://localhost:7288/Login", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ email, wachtwoord }),
    //         });
    
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    
    //         const responseData = await response.json();
    
    //         console.log("Response:", responseData);
    
    //         // Handle the response, e.g., store the token in local storage
    //         const { token, userId } = responseData;
    //         localStorage.setItem("JWT_access_token", token);
    //         localStorage.setItem("user_id", userId);
    
    //         // Call the parent onSubmit callback if provided
    //         if (onSubmit) {
    //             onSubmit({ email, wachtwoord });
    //         }
    //     } catch (error) {
    //         // Handle login error
    //         console.error("Login failed:", error.message);
    //     }
    // };

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