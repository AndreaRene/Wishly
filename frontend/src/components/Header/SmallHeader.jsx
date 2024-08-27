import './Header.css';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '../../assets/logout_goldenrod.svg';
import { logout } from '../../services/authServices';

const SmallHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate( '/login' );
    };

    return (
        <header className="small-header">
            <div className='icon-container'>
                <img
                    src={ LogoutIcon }
                    alt="Logout"
                    className="icon"
                    onClick={ handleLogout }
                    style={ { cursor: 'pointer' } }
                />
            </div>
        </header>
    );
}

export default SmallHeader;
