import ProfileIcon from '../../assets/profile_goldenrod.svg';
import CalendarIcon from '../../assets/calendar_goldenrod.svg';
import ListIcon from '../../assets/list_goldenrod.svg';
import SettingsIcon from '../../assets/settings_goldenrod.svg';
import LogoutIcon from '../../assets/logout_goldenrod.svg';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-icon-group">
                <img src={ CalendarIcon } alt="Calendar" className="icon" />
                <img src={ ProfileIcon } alt="Profile" className="icon" />
                <img src={ ListIcon } alt="List" className="icon" />
                <img src={ SettingsIcon } alt="Settings" className="icon" />
                <img src={ LogoutIcon } alt="Logout" className="icon" />
            </div>
        </footer>
    );
};

export default Footer;