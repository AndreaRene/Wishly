import { useState } from 'react';
import './Login_Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState( '' );
    const [password, setPassword] = useState( '' );
    const [errorMessage, setErrorMessage] = useState( '' );
    const navigate = useNavigate();

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        try {
            const response = await axios.post( '/api/login/', {
                username: username,
                password: password,
            } );

            const { access, refresh } = response.data;
            localStorage.setItem( 'accessToken', access );
            localStorage.setItem( 'refreshToken', refresh );
            localStorage.setItem( 'username', response.data.username );

            // Redirect to the dashboard after successful login
            navigate( '/dashboard' );
        } catch ( error ) {
            setErrorMessage( 'Invalid username or password.' );
            console.error( 'Login failed:', error );
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={ handleSubmit }>
                <div>
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
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        pattern=".{6,}"
                        value={ password }
                        onChange={ ( e ) => setPassword( e.target.value ) }
                        required
                    />
                    <p className="error-message">
                        { errorMessage }
                    </p>
                    <button type="submit" className="button-login" disabled={ !username || !password }>
                        Login
                    </button>
                </div>
            </form>
            <p>Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
}

export default Login;
