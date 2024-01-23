import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient';
import '../../stylesheets/RegistreerEnLogin.css';

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

const GebruikerInlogForm = () => {
    const [email, setEmail] = useState('');
    const [wachtwoord, setWachtwoord] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
    
        try {
            const response = await apiClient.post("https://localhost:7288/Login", { email, wachtwoord });
            if (response.status === 200) {
                const { userId, message } = response.data;
                console.log('Login successful:', message);
                console.log('UserId:', userId);
                navigate('/'); // Navigate to homepage
            }
        } catch (error) {
            // Handle login error here
            setErrorMessage("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {isLoading && <div className="loading-indicator">Laden...</div>}
            
            <label htmlFor="email">Email:</label>
            <input 
                className="input-form-field"
                placeholder="Email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
            />
      
            <label htmlFor="wachtwoord">Wachtwoord:</label>
            <input 
                className="input-form-field"
                placeholder="Wachtwoord"
                type="password" 
                value={wachtwoord} 
                onChange={(e) => setWachtwoord(e.target.value)} 
                required
            />

            <div className="center-register-button">
                <button className="registreer-button" type="submit">Login</button>
            </div>
        </form>
    );
};

const LoginOpties = () => {
    return (
        <div className='login-opties-container'>
            <div className='wachtwoord-vergeten-container'>
                <p className='login-wachtwoord-vergeten'>Wachtwoord vergeten? <a className='login-opties-text' href='/wachtwoordvergeten'>Klik hier</a></p>
            </div>
            
            <div className='registreer-account-container'>
                <p className='login-geen-account'>Geen account? <a className='login-opties-text' href='/registreer'>Maak er hier een</a></p>
            </div>
        </div>
    );
}

const GoogleLogin = () => {
    return (
        <div className='google-login-container'>
            <button id='google-login-button'>Login met Google</button>
        </div>  
    );
}
