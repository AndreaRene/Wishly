import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../assets/profile_goldenrod.svg';
import CalendarIcon from '../../assets/calendar_goldenrod.svg';
import ListIcon from '../../assets/list_goldenrod.svg';
import SettingsIcon from '../../assets/settings_goldenrod.svg';
import { debounce } from 'lodash';
import './Footer.css';

const Footer = () => {
    const navigate = useNavigate();

    // Debounce navigation function to prevent rapid successive clicks
    const debouncedNavigate = debounce( ( path ) => {
        navigate( path );
    }, 300 ); // Adjust the debounce time as needed

    return (
        <footer className="footer">
            <div className="footer-icon-group">
                <div onClick={ () => debouncedNavigate( '/view-calendar' ) }>
                    <img src={ CalendarIcon } alt="Calendar" className="icon" />
                </div>
                <div onClick={ () => debouncedNavigate( '/wishlist' ) }>
                    <img src={ ListIcon } alt="List" className="icon" />
                </div>
                <div onClick={ () => debouncedNavigate( '/dashboard' ) }>
                    <img src={ ProfileIcon } alt="Profile" className="icon" />
                </div>
                <div onClick={ () => debouncedNavigate( '/settings' ) }>
                    <img src={ SettingsIcon } alt="Settings" className="icon" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
