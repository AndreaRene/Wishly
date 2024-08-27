import CalendarIcon from '../../assets/calendar_goldenrod.svg';
import GiftIcon from '../../assets/gift-goldenrod.svg';
import './LoggedInHeader.css';

const Header = () => {
    return (
        <header className="header">
            <div className="icon-group">
                <img src={ CalendarIcon } alt="Calendar" className="icon" />
                <img src={ GiftIcon } alt="Gift" className="icon" />
            </div>
        </header>
    );
};

export default Header;
