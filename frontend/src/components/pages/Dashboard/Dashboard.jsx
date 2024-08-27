import './Dashboard.css';
import Gift from '../../../assets/gift_goldenrod.svg';
import Calendar from '../../../assets/calendar_goldenrod.svg';
import { useEffect, useState } from 'react';

const Dashboard = () => {

    const [username, setUsername] = useState( '' );

    useEffect( () => {
        const storedUsername = localStorage.getItem( 'username' );
        setUsername( storedUsername );
    }, [] );

    return (
        <main className="dashboard-content">
            <section className="dashboard-header">
                <h1>Hello, Emma!</h1>
                <p>What would you like to do today?</p>
            </section>
            <section className='card-group'>
                <div className="dashboard-card">
                    <img src={ Gift } alt="Add an event" />Add an Event
                </div>
                <div className="dashboard-card">
                    <img src={ Calendar } alt="View My Calendar" />View My Calendar
                </div>
            </section>

            <section className='upcoming-events'>
                <h2>Upcoming Events</h2>
                <ul>
                    <li>August 31, 2024 - Mom and Dad&apos;s 30th Anniversary</li>
                    <li>October 9, 2024 - Julie&apos;s 28th Birthday</li>
                    <li>December 25, 2024 - Christmas</li>
                </ul>
            </section>

            <section className='button-group'>
                <button className="button-action">Manage Wishlist</button>
                <button className="button-normal">Manage Friendships</button>
            </section>
        </main>
    );
}

export default Dashboard;
