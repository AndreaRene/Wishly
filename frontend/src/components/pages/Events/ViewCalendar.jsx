import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../services/axiosInstance';

import AddIcon from '../../../assets/add_goldenrod.svg';

import './events.css';

const ViewCalendar = () => {
    const [events, setEvents] = useState( [] );
    const navigate = useNavigate();

    useEffect( () => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get( '/events/' );
                setEvents( response.data );
            } catch ( error ) {
                console.error( 'Error fetching events:', error );
            }
        };

        fetchEvents();
    }, [] );

    const formatEventDate = ( date ) => {
        const day = new Date( date + 'T00:00:00' ).getDate();
        const suffix = ( day ) => {
            if ( day > 3 && day < 21 ) return 'th';
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
