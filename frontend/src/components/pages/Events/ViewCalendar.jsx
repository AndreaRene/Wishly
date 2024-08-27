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
                console.log( 'Events:', response.data )
                setEvents( response.data );
            } catch ( error ) {
                console.error( 'Error fetching events:', error );
            }
        };

        fetchEvents();
    }, [] );

    const groupEventsByMonthYear = ( events ) => {
        const grouped = events.reduce( ( acc, event ) => {
            const date = new Date( event.date );
            const monthYear = date.toLocaleString( 'default', { month: 'long', year: 'numeric' } );

            if ( !acc[monthYear] ) {
                acc[monthYear] = [];
            }

            acc[monthYear].push( event );
            return acc;
        }, {} );

        // Sort the grouped events by date
        const sortedKeys = Object.keys( grouped ).sort( ( a, b ) => {
            const [monthA, yearA] = a.split( ' ' );
            const [monthB, yearB] = b.split( ' ' );
            return new Date( `${monthA} 1, ${yearA}` ) - new Date( `${monthB} 1, ${yearB}` );
        } );

        const sortedGrouped = {};
        sortedKeys.forEach( key => {
            sortedGrouped[key] = grouped[key];
        } );

        return sortedGrouped;
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
                                <li key={ event.id }>
                                    { new Date( event.date ).getDate() }th - { event.username } - { event.name }
                                </li>
                            ) ) }
                        </ul>
                    </div>
                ) )
            ) }
        </div>
    );
};

export default ViewCalendar;
