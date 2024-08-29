import { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [user, setUser] = useState( {} );

  useEffect( () => {
    const storedUser = {
      username: localStorage.getItem( 'username' ),
      email: localStorage.getItem( 'email' ),
      firstName: localStorage.getItem( 'firstName' ),
      lastName: localStorage.getItem( 'lastName' ),
    };
    setUser( storedUser );
  }, [] );

  return (
    <div className="settings-page">
      <section className="user-info">
        <h1>Account Information</h1>
        <p><strong>Username:</strong> { user.username }</p>
      </section>
      <section className="notice">
        <p>More application settings and editing your settings and profile information are coming soon!</p>
      </section>
    </div>
  );
};

export default Settings;
