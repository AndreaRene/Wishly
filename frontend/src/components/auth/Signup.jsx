import { useState } from 'react';
import axios from 'axios'; // Import axios
import './Login_Signup.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirect

const Signup = () => {
    const [username, setUsername] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [password, setPassword] = useState( '' );
    const [confirmPassword, setConfirmPassword] = useState( '' );
    const [firstName, setFirstName] = useState( '' );
    const [lastName, setLastName] = useState( '' );
    const [errorMessage, setErrorMessage] = useState( '' ); // For handling errors

    const navigate = useNavigate(); // For navigation

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        if ( password !== confirmPassword ) {
            setErrorMessage( "Passwords do not match." );
            return;
        }

        try {
            // Make the POST request to your API
            const response = await axios.post( '/api/register/', {
                username,
                first_name: firstName,
                last_name: lastName,
                email,
                password
            } );

            if ( response.status === 201 ) {
                // If account creation is successful, redirect to dashboard
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
}

export default Signup;
