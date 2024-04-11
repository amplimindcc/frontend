import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Invite from './pages/Invite/Invite';
import Commit from './pages/Commit/Commit';
import ProjectState from './pages/ProjectState/ProjectState';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/invite">
                    <Route path=":token" element={<Invite />} />
                </Route>
                <Route path="/commit" element={<Commit />} />
                <Route path="/:username" element={<ProjectState />} />
            </Routes>
        </Router>
    );
}
