import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
        await screen.findByTestId("login-form");
    });

    test('unsuccessful login', async () => {
        await screen.findByTestId("login-form");

        const user = userEvent.setup()
        const button = screen.getByRole('button', { name: /login/i });
        await user.click(button);

        await screen.findByText(/Invalid email or password/i);
    });

    test('successful login', async () => {
        const user = userEvent.setup()

        const form = await screen.findByTestId("login-form");
        assert(form !== null);

        const email = screen.getByLabelText(/email/i);
        await user.type(email, 'user@web.de');

        const password = screen.getByLabelText(/password/i);
        await user.type(password, 'user');

        const button = screen.getByRole('button', { name: /login/i });
        await user.click(button);

        await screen.findByText(/login successful/i);
    });

    test('rate limit', async () => {
        await screen.findByTestId("login-form");

        const user = userEvent.setup()
        const button = screen.getByRole('button', { name: /login/i });
        await user.click(button);
        wait(5000);
        await user.click(button);
        wait(5000);
        await user.click(button);
        wait(5000);
        await user.click(button);
        wait(5000);
        await user.click(button);
        wait(5000);
        await user.click(button);

        await screen.findByText(/Too many requests. Try again later./i);
    });
});