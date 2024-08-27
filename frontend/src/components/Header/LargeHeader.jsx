import CalendarIcon from '../../assets/large_icons/lg_cal_gold.svg';
import GiftIcon from '../../assets/large_icons/lg_gft_gold.svg';
import './Header.css';

const Header = () => {
    return (
        <header className="large-header">
            <div className="icon-group">
                <img src={ CalendarIcon } alt="Calendar" className="icon" />
                <img src={ GiftIcon } alt="Gift" className="icon" />
            </div>
        </header>
    );
};

export default Header;
