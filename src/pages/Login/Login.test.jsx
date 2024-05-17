import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AuthProvider from '../../components/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './Login'
import { ToastContainer } from 'react-toastify';

import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';

const baseURL = 'http://localhost:8080';

beforeEach(() => {
    render(
        <>
            <AuthProvider>
                <Router>
                    <LoginPage />
                </Router>
                <ToastContainer />
            </AuthProvider>
        </>
    );
});

describe('Login', () => {
    test('form is rendered', async () => {
        await screen.findByTestId('login-form');
    });

    test('renders email input', async () => {
        await screen.findByLabelText(/email/i);
    });

    test('renders password input', async () => {
        await screen.findByLabelText(/password/i);
    });

    test('renders login button', async () => {
        await screen.findByRole('button', { name: /login/i });
    });

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

        await screen.findByTestId('login-form');

        const email = screen.getByLabelText(/email/i);
        await user.type(email, 'user@web.de');

        const password = screen.getByLabelText(/password/i);
        await user.type(password, 'user');

        const button = screen.getByRole('button', { name: /login/i });
        await user.click(button);

        await screen.findByText(/login successful/i);
    });

    test('unsuccessful login', async () => {
        server.use(
            http.post(`${baseURL}/v1/auth/login`, () => {
                return new HttpResponse(null, {
                    status: 403
                })
            })
        );

        await screen.findByTestId('login-form');

        const user = userEvent.setup();
        const button = await screen.findByRole('button', { name: /login/i });
        await user.click(button);

        await screen.findByText(/Invalid email or password/i);
    });

    test('network error while logging in', async () => {
        server.use(
            http.post(`${baseURL}/v1/auth/login`, () => {
                return HttpResponse.error();
            })
        )

        await screen.findByTestId('login-form');

        const user = userEvent.setup();
        const button = await screen.findByRole('button', { name: /login/i });
        await user.click(button);

        screen.getByText(/Connection error/i);
    })
});