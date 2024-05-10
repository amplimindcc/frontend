import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login'
import { ToastContainer } from 'react-toastify';
import { beforeEach } from 'vitest';
import AuthProvider from '../../components/AuthProvider';

beforeEach(() => {
    render(
        <>
            <AuthProvider>
                <Router>
                    <Login />
                </Router>
                <ToastContainer />
            </AuthProvider>
        </>
    );
});

describe('Login', () => {
    test('renders without crashing', async () => {
        const loginComponent = await screen.findByTestId("login-form");
        expect(loginComponent).toBeInTheDocument();
    });

    test('renders email input', async () => {
        const emailInput = await screen.findByLabelText(/email/i);
        expect(emailInput).toBeInTheDocument();
    });

    test('renders password input', async () => {
        const passwordInput = await screen.findByLabelText(/password/i);
        expect(passwordInput).toBeInTheDocument();
    });

    test('renders login button', async () => {
        const loginButton = await screen.findByRole('button', { name: /login/i });
        expect(loginButton).toBeInTheDocument();
    });

    test('renders form', async () => {
        const loginForm = await screen.findByTestId("login-form");
        expect(loginForm).toBeInTheDocument();
    });

    // test inputs work
    test('email input works', async () => {
        const emailInput = await screen.findByLabelText(/email/i);
        await userEvent.type(emailInput, 'test');
        expect(emailInput).toHaveValue('test');
    });

    test('password input works', async () => {
        const passwordInput = await screen.findByLabelText(/password/i);
        await userEvent.type(passwordInput, 'test');
        expect(passwordInput).toHaveValue('test');
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

    test('form is rendered', async () => {
        await screen.findByTestId("login-form");
    });

    test('unsuccessful login', async () => {
        await screen.findByTestId("login-form");

        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: /login/i });
        await user.click(button);

        await screen.findByText(/Invalid email or password/i);
    });
});