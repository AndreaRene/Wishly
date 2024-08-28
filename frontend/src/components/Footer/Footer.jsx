import { Link } from 'react-router-dom';
import ProfileIcon from '../../assets/profile_goldenrod.svg';
import CalendarIcon from '../../assets/calendar_goldenrod.svg';
import ListIcon from '../../assets/list_goldenrod.svg';
import SettingsIcon from '../../assets/settings_goldenrod.svg';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-icon-group">
                <Link to="/view-calendar">
                    <img src={ CalendarIcon } alt="Calendar" className="icon" />
                </Link>
                <Link to="/wishlist">
                    <img src={ ListIcon } alt="List" className="icon" />
                </Link>
                <Link to="/dashboard">
                    <img src={ ProfileIcon } alt="Profile" className="icon" />
                </Link>
                <img src={ SettingsIcon } alt="Settings" className="icon" />
            </div>
        </footer>
    );
};

export default Footer;
