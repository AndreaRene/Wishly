import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Events.css';

const NewEvent = () => {
    const [name, setName] = useState( '' );
    const [date, setDate] = useState( '' );
    const [description, setDescription] = useState( '' );
    // const [isRecurring, setIsRecurring] = useState( false );
    // const [recurrencePattern, setRecurrencePattern] = useState( '' );
    // const [recurrenceEndDate, setRecurrenceEndDate] = useState( '' );
    const [visibleToFriends, setVisibleToFriends] = useState( false );
    const [username, setUsername] = useState( '' ); // State for username

    const navigate = useNavigate();

    useEffect( () => {
        const storedUsername = localStorage.getItem( 'username' );
        setUsername( storedUsername );
    }, [] );

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        const localDate = new Date( date );
        localDate.setMinutes( localDate.getMinutes() + localDate.getTimezoneOffset() );
        const formattedDate = localDate.toISOString().split( 'T' )[0];

        const eventData = {
            name,
            date: formattedDate,
            description,
            // is_recurring: isRecurring,
            visible_to_friends: visibleToFriends,
        };

        // if ( isRecurring ) {
        //     eventData.recurrence_pattern = recurrencePattern;

        //     if ( recurrenceEndDate ) {
        //         const localEndDate = new Date( recurrenceEndDate );
        //         localEndDate.setMinutes( localEndDate.getMinutes() + localEndDate.getTimezoneOffset() );
        //         eventData.recurrence_end_date = localEndDate.toISOString().split( 'T' )[0];
        //     }
        // }

        try {
            await axios.post( '/api/events/', eventData, {
                headers: { Authorization: `Bearer ${localStorage.getItem( 'accessToken' )}` },
            } );
            navigate( '/view-calendar' );
        } catch ( error ) {
            console.error( 'Error creating event:', error );
        }
    };

    return (
        <div className="new-event-container">
            <section className="new-event-header">
                <h1>Hello, { username || 'friend' }!</h1>
                <p>Tell us about your event!</p>
            </section>
            <form onSubmit={ handleSubmit } className="new-event-form">
                <label>
                    Event Name:
                    <input type="text" value={ name } onChange={ ( e ) => setName( e.target.value ) } required />
                </label>
                <label>
                    Date:
                    <input type="date" value={ date } onChange={ ( e ) => setDate( e.target.value ) } required />
                </label>
                <label>
                    Description:
                    <textarea value={ description } onChange={ ( e ) => setDescription( e.target.value ) } />
                </label>
                {/* <div className="checkbox-group">
                    <input
                        type="checkbox"
                        checked={ isRecurring }
                        onChange={ ( e ) => setIsRecurring( e.target.checked ) }
                    />
                    <label>Is this event recurring</label>
                </div>
                { isRecurring && (
                    <>
                        <label>
                            Recurrence Pattern:
                            <select value={ recurrencePattern } onChange={ ( e ) => setRecurrencePattern( e.target.value ) }>
                                <option value="">None</option>
                                <option value="DA">Daily</option>
                                <option value="WE">Weekly</option>
                                <option value="MO">Monthly</option>
                                <option value="YE">Yearly</option>
                            </select>
                        </label>
                        <label>
                            Recurrence End Date:
                            <input type="date" value={ recurrenceEndDate } onChange={ ( e ) => setRecurrenceEndDate( e.target.value ) } />
                        </label>
                    </>
                ) } */}
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        checked={ visibleToFriends }
                        onChange={ ( e ) => setVisibleToFriends( e.target.checked ) }
                    />
                    <label>Visible to Friends</label>
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default NewEvent;
