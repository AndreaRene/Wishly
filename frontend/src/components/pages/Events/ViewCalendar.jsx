import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Events.css';
import AddIcon from '../../../assets/add_goldenrod.svg'; // Import the add icon

const ViewCalendar = () => {
    const [events, setEvents] = useState( [] );
    const navigate = useNavigate(); // Initialize useNavigate

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

    // Function to format the date with ordinal suffix
    const formatEventDate = ( date ) => {
        const day = new Date( date + 'T00:00:00' ).getDate();
        const suffix = ( day ) => {
            if ( day > 3 && day < 21 ) return 'th'; // Covers 4th-20th
            switch ( day % 10 ) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        const formattedDay = `${day}${suffix( day )}`;
        return formattedDay;
    };

    // Function to group and sort events by month and year
    const groupEventsByMonthYear = ( events ) => {
        const sortedEvents = events.sort( ( a, b ) => new Date( a.date ) - new Date( b.date ) );
        return sortedEvents.reduce( ( acc, event ) => {
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
                                <li key={ event.id }>
                                    { formatEventDate( event.date ) } - { event.username } : { event.name }
                                </li>
                            ) ) }
                        </ul>
                    </div>
                ) )
            ) }

            {/* Floating Add Event Button */ }
            <div className="floating-button" onClick={ () => navigate( '/new-event' ) }>
                <img src={ AddIcon } alt="Add Event" />
            </div>
        </div>
    );
};

export default ViewCalendar;
