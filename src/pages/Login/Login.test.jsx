import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'

describe('Login', () => {

    test('form is rendered', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const form = await screen.findByTestId("login-form");
        assert(form !== null);
    })
})