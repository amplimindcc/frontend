import './Admin.css';
import AdminWelcome from './components/AdminWelcome/AdminWelcome';
import Navigation from './components/Navigation/Navigation';

export default function Admin() {
    return (
        <>
            <Navigation />
            <AdminWelcome />
        </>
    );
}