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
                <Link to="/new-event" className='dashboard-card'>
                    <img src={ Gift } alt="Add an event" />Add an Event
                </Link>
                <Link to="/view-calendar" className="dashboard-card">
                    <img src={ Calendar } alt="View My Calendar" />View My Calendar
                </Link>
            </section>

            <UpcomingEvents />

            <section className='button-group'>
                <button className="button-action">Manage Wishlist</button>
                <button className="button-normal">Manage Friendships</button>
            </section>
        </main>
    );
}

export default Dashboard;
