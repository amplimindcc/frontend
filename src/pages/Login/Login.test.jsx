import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login'
import { ToastContainer } from 'react-toastify';
import { beforeEach } from 'vitest';

beforeEach(() => {
    render(
        <>
            <Router>
                <Login />
            </Router>
            <ToastContainer />
        </>
    );
});

describe('Login', () => {
    test('form is rendered', async () => {
        const form = await screen.findByTestId("login-form");
        assert(form !== null);
    });

    test('unsuccessful login', async () => {
        const form = await screen.findByTestId("login-form");

        const button = screen.getByRole('button', { name: /login/i });
        button.click();

        await screen.findByText(/403: Invalid email or password/i);
    });

    test('successful login', async () => {
        const form = await screen.findByTestId("login-form");
        assert(form !== null);

        const email = screen.getByLabelText(/email/i);
        fireEvent.change(email, { target: { value: 'user@web.de' } });

        const password = screen.getByLabelText(/password/i);
        fireEvent.change(password, { target: { value: 'user' } });

        const button = screen.getByRole('button', { name: /login/i });
        button.click();

        await screen.findByText(/login successful/i);
    });
});