import { useState, useEffect } from 'react';
import axiosInstance from '../../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './events.css';

const NewEvent = () => {
    const [name, setName] = useState( '' );
    const [date, setDate] = useState( '' );
    const [description, setDescription] = useState( '' );
    const [visibleToFriends, setVisibleToFriends] = useState( false );
    const [username, setUsername] = useState( '' );

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
            visible_to_friends: visibleToFriends,
        };

        try {
            await axiosInstance.post( '/events/', eventData );
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
                    <input type="text" value={ name } onChange={ ( e ) => setName( e.target.value ) } required placeholder='What are we doing?' />
                </label>
                <label>
                    Date:
                    <input type="date" value={ date } onChange={ ( e ) => setDate( e.target.value ) } required />
                </label>
                <label>
                    Description:
                    <textarea value={ description } onChange={ ( e ) => setDescription( e.target.value ) } placeholder='Where are we going?' />
                </label>
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
