import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const UpcomingEvents = () => {
    const [events, setEvents] = useState( [] );
    const [loading, setLoading] = useState( true );

    useEffect( () => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem( 'accessToken' );
                const response = await axios.get( '/api/events', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                } );
                const sortedEvents = response.data.sort( ( a, b ) => new Date( a.date ) - new Date( b.date ) );
                setEvents( sortedEvents.slice( 0, 3 ) ); // Get the next 3 events
            } catch ( error ) {
                console.error( "Error fetching events:", error );
            } finally {
                setLoading( false );
            }
        };

        fetchEvents();
    }, [] );

    if ( loading ) {
        return <p>Loading events...</p>;
    }

    const formatEventDate = ( date ) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date( date + 'T00:00:00' ).toLocaleDateString( 'en-US', options );
    };

    return (
        <section className='upcoming-events'>
            <h2>Upcoming Events</h2>
            { events.length > 0 ? (
                <ul>
                    { events.map( ( event, index ) => (
                        <li key={ index }>
                            { formatEventDate( event.date ) } - { event.name }
                        </li>
                    ) ) }
                </ul>
            ) : (
                <p>No upcoming events.</p>
            ) }
        </section>
    );
};

export default UpcomingEvents;
