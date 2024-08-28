import 'skeleton-css/css/skeleton.css';
import 'skeleton-css/css/normalize.css';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import SmallHeader from './components/Header/SmallHeader';
import LargeHeader from './components/Header/LargeHeader';
import LandingPage from './components/pages/LandingPage/LandingPage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/pages/Dashboard/Dashboard';
import ViewCalendar from './components/pages/Events/ViewCalendar';
import NewEvent from './components/pages/Events/NewEvent';
import Wishlist from './components/pages/Wishlist/Wishlist';
import NewWishlistItem from './components/pages/Wishlist/NewWishlistItem';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();


  const noFooterRoutes = ['/', '/login', '/signup'];

  const isNoFooterRoute = noFooterRoutes.includes( location.pathname );

  const token = localStorage.getItem( 'accessToken' );

  if ( location.pathname === '/' && token ) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      { isNoFooterRoute ? <LargeHeader /> : <SmallHeader /> }
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        {/* Protect the dashboard route */ }
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/view-calendar"
          element={
            <PrivateRoute>
              <ViewCalendar />
            </PrivateRoute> } />
        <Route path="/new-event"
          element={
            <PrivateRoute>
              <NewEvent />
            </PrivateRoute> } />
        <Route path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute> } />
        <Route path="/new-wishlist-item"
          element={
            <PrivateRoute>
              <NewWishlistItem />
            </PrivateRoute> } />
        {/* Add more routes here */ }
      </Routes>
      { !isNoFooterRoute && <Footer /> }
    </>
  );
}

export default App;
