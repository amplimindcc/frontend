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
    });
});