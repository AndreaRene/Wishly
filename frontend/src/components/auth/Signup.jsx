import { useState } from 'react';
import axios from 'axios';
import './Login_Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';

const Signup = () => {
    const [username, setUsername] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [password, setPassword] = useState( '' );
    const [confirmPassword, setConfirmPassword] = useState( '' );
    const [firstName, setFirstName] = useState( '' );
    const [lastName, setLastName] = useState( '' );
    const [errorMessage, setErrorMessage] = useState( '' );

    const navigate = useNavigate();

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        if ( password !== confirmPassword ) {
            setErrorMessage( "Passwords do not match." );
            return;
        }

        try {
            const response = await axiosInstance.post( '/register/', {
                username,
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            } );

            if ( response.status === 201 ) {
                localStorage.setItem( 'username', username );  // Store username
                localStorage.setItem( 'accessToken', response.data.accessToken );
                localStorage.setItem( 'refreshToken', response.data.refreshToken );

                navigate( '/dashboard' );
            }
        } catch ( error ) {
            setErrorMessage( "There was an error creating your account. Please try again." );
            console.error( "Error:", error );
        }
    };

    return (
        <div className='form-container'>
            <h1>Signup</h1>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    pattern="[A-Za-z0-9_]{3,20}"
                    value={ username }
                    onChange={ ( e ) => setUsername( e.target.value ) }
                    required
                />

                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    pattern="[A-Za-z]{1,20}"
                    value={ firstName }
                    onChange={ ( e ) => setFirstName( e.target.value ) }
                    required
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    pattern="[A-Za-z]{1,20}"
                    value={ lastName }
                    onChange={ ( e ) => setLastName( e.target.value ) }
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={ email }
                    onChange={ ( e ) => setEmail( e.target.value ) }
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={ password }
                    onChange={ ( e ) => setPassword( e.target.value ) }
                    required
                />

                <div className="confirm-password-container">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={ confirmPassword }
                        onChange={ ( e ) => setConfirmPassword( e.target.value ) }
                        required
                    />
                    <p className="error-message">
                        { password !== confirmPassword && "Passwords do not match." }
                    </p>
                </div>

                <button type="submit" className="button-signup" disabled={ !username || !firstName || !lastName || !email || !password || !confirmPassword || password !== confirmPassword }>
                    Signup
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Signup;
