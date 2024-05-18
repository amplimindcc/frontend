import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AuthProvider from '../../components/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import ResetPasswordRequestPage from './ResetPasswordRequest'
import { ToastContainer } from 'react-toastify';

import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import LangProvider from '../../components/LangProvider';

const baseURL = import.meta.env.VITE_API_URL;

beforeEach(() => {
    Object.defineProperty(navigator, 'language', {
        value: 'en',
        configurable: true,
    });

    render(
        <>
            <AuthProvider>
                <LangProvider>
                    <Router>
                        <ResetPasswordRequestPage />
                    </Router>
                    <ToastContainer />
                </LangProvider>
            </AuthProvider>
        </>
    );
});

describe('ResetPasswordRequest', () => {
    test('reset password request form is rendered', async () => {
        await screen.findByTestId('reset-password-request-form');
    });

    test('reset password request renders email input', async () => {
        await screen.findByLabelText(/email/i);
    });

    test('reset password request renders reset password button', async () => {
        await screen.findByRole('button', { name: /request new password/i });
    });

    test('reset password request email input works', async () => {
        const emailInput = await screen.findByLabelText(/email/i);
        await userEvent.type(emailInput, 'test');
        expect(emailInput).toHaveValue('test');
    });

    test('successful reset password request', async () => {
        const user = userEvent.setup();

        await screen.findByTestId('reset-password-request-form');

        const emailInput = await screen.findByLabelText(/email/i);
        await user.type(emailInput, 'user@web.de');

        const button = await screen.findByRole('button', { name: /request new password/i });
        await user.click(button);

        await screen.findByText(/request successful/i);
    });

    test('failed reset password request', async () => {
        server.use(
            http.post(`${baseURL}/v1/account/request-password-change/user@web.de`, () => {
                return new HttpResponse(null, {
                    status: 403
                })
            }),
        );

        const user = userEvent.setup()

        await screen.findByTestId('reset-password-request-form');

        const emailInput = await screen.findByLabelText(/email/i);
        await user.type(emailInput, 'user@web.de');

        const button = await screen.findByRole('button', { name: /request new password/i });
        await user.click(button);

        await screen.findByText(/invalid/i);
    });

    test('network error reset password request', async () => {
        server.use(
            http.post(`${baseURL}/v1/account/request-password-change/user@web.de`, () => {
                return HttpResponse.error();
            }),
        );

        const user = userEvent.setup()

        await screen.findByTestId('reset-password-request-form');

        const emailInput = await screen.findByLabelText(/email/i);
        await user.type(emailInput, 'user@web.de');

        const button = await screen.findByRole('button', { name: /request new password/i });
        await user.click(button);

        await screen.findByText(/Error while resetting/i);
    });
});