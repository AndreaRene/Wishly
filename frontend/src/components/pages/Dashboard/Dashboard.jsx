import './Dashboard.css';
import Gift from '../../../assets/gift_goldenrod.svg';
import Calendar from '../../../assets/calendar_goldenrod.svg';
import UpcomingEvents from './UpcomingEvents';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [username, setUsername] = useState( '' );

    useEffect( () => {
        const storedUsername = localStorage.getItem( 'username' );
        setUsername( storedUsername );
    }, [] );

    return (
        <main className="dashboard-content">
            <section className="dashboard-header">
                <h1>Hello, { username }!</h1>
                <p>What would you like to do today?</p>
            </section>
            <section className='card-group'>
                <Link to="/new-event" className='dashboard-card-link'>
                    <div className='dashboard-card'>
                        <img src={ Gift } alt="Add an event" />Add an Event
                    </div>
                </Link>
                <Link to="/view-calendar" className="dashboard-card-link">
                    <div className='dashboard-card'>
                        <img src={ Calendar } alt="View My Calendar" />View My Calendar
                    </div>
                </Link>
            </section>

            <UpcomingEvents />

            <section className='button-group'>
                <Link to="/wishlist" className="button-link">
                    <button className="button-action">Manage Wishlist</button>
                </Link>
                <Link to="/manage-friendships" className="button-link">
                    <button className="button-normal">Manage Friendships</button>
                </Link>
            </section>
        </main>
    );
}

export default Dashboard;
