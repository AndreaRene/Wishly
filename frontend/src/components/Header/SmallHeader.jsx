import './Header.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import LogoutIcon from '../../assets/logout_goldenrod.svg';
import { logout } from '../../services/authServices'; // Import the logout function

const SmallHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clear tokens and other session data
        navigate( '/login' ); // Redirect to login page
    };

    return (
        <header className="small-header">
            <img
                src={ LogoutIcon }
                alt="Logout"
                className="icon"
                onClick={ handleLogout } // Add the onClick handler
                style={ { cursor: 'pointer' } } // Change cursor to pointer for better UX
            />
        </header>
    );
}

export default SmallHeader;
