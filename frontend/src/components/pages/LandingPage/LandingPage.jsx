import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="twelve columns">
                    <div className="landing-page">
                        <h1>Welcome to Wishly</h1>
                        <div className="button-group">
                            <Link to="/login">
                                <button className="button-normal">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="button-action">Signup</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
