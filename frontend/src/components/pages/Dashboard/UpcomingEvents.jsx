import { useState, useEffect } from 'react';
import axiosInstance from '../../../services/axiosInstance';
import './Dashboard.css';

const UpcomingEvents = () => {
    const [events, setEvents] = useState( [] );
    const [loading, setLoading] = useState( true );

    useEffect( () => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get( '/events/' );

                if ( Array.isArray( response.data ) ) {
                    const sortedEvents = response.data.sort( ( a, b ) => new Date( a.date ) - new Date( b.date ) );
                    setEvents( sortedEvents.slice( 0, 3 ) ); // Get the next 3 events
                } else {
                    console.error( "Expected an array but got:", typeof response.data );
                }
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
