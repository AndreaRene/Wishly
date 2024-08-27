import { useEffect, useState } from 'react';
import axios from 'axios';
import './Events.css';

const ViewCalendar = () => {
    const [events, setEvents] = useState( [] );

    useEffect( () => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get( '/api/events/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem( 'accessToken' )}` }
                } );
                setEvents( response.data );
            } catch ( error ) {
                console.error( 'Error fetching events:', error );
            }
        };

        fetchEvents();
    }, [] );

    const groupEventsByMonthYear = ( events ) => {
        return events.reduce( ( acc, event ) => {
            const date = new Date( event.date );
            const monthYear = date.toLocaleString( 'default', { month: 'long', year: 'numeric' } );

            if ( !acc[monthYear] ) {
                acc[monthYear] = [];
            }

            acc[monthYear].push( event );
            return acc;
        }, {} );
    };

    const groupedEvents = groupEventsByMonthYear( events );

    return (
        <div className="view-calendar">
            { Object.keys( groupedEvents ).length === 0 ? (
                <p>No events available.</p>
            ) : (
                Object.keys( groupedEvents ).map( ( monthYear ) => (
                    <div key={ monthYear } className="month-group">
                        <h2>{ monthYear }</h2>
                        <ul>
                            { groupedEvents[monthYear].map( ( event ) => (
                                <li key={ event.id }>{ event.name } - { new Date( event.date ).toLocaleDateString() }</li>
                            ) ) }
                        </ul>
                    </div>
                ) )
            ) }
        </div>
    );
};

export default ViewCalendar;
