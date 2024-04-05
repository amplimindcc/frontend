import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import Admin from './pages/Admin/Admin';
import Invite from './pages/Invite/Invite';
import Commit from './pages/Commit/Commit';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/invite" element={<Invite />} />
                <Route path="/commit" element={<Commit />} />
            </Routes>
        </Router>
    );
}