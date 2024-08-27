import './dashboard.css';

const Dashboard = () => {
    return (
        <main className="dashboard">
            <div className="dashboard-content">
                <h1>Hello, User!</h1>
                <p>What would you like to do today?</p>
                <section className='button-group'>
                    <button className="button-action">Add an Event</button>
                    <button className="button-normal">View My Calendar</button>
                </section>
                <section className='upcoming-events'>
                    <h2>Upcoming Events</h2>
                    <ul>
                        <li>Event 1</li>
                        <li>Event 2</li>
                        <li>Event 3</li>
                    </ul>
                </section>
                <section className='button-group'>
                    <button className="button-action">Manage Wishlist</button>
                    <button className="button-normal">Manage Friendships</button>
                </section>
            </div>
        </main>
    );
}

export default Dashboard;