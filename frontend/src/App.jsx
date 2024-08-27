import 'skeleton-css/css/skeleton.css';
import 'skeleton-css/css/normalize.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/LoggedInHeader';
import LandingPage from './components/pages/LandingPage/LandingPage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <>
      < Header />
      <Router>
        <Routes>
          <Route path="/" element={ <LandingPage /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
