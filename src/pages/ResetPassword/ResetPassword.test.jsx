import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AuthProvider from '../../components/AuthProvider';;
import ResetPasswordPage from './ResetPassword'
import { ToastContainer } from 'react-toastify';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import { expect } from 'vitest';

const baseURL = import.meta.env.VITE_API_URL;
const token = 'notnull';
let runBeforeEach = true;

beforeEach(() => {
    if(runBeforeEach) {
        render(
            <>
                <AuthProvider>
                    <MemoryRouter initialEntries={[`/reset-password/${token}`]}>
                        <Routes>
                            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                        </Routes>
                    </MemoryRouter>
                    <ToastContainer />
                </AuthProvider>
            </>
        );
    }
});

describe('ResetPassword', () => {
    test('form is rendered', async () => {
        await screen.findByTestId('reset-password-form');
    });

    test('renders password input', async () => {
        await screen.findByLabelText(/password:/i);
    });

    test('renders confirm password input', async () => {
        await screen.findByLabelText(/password repeat:/i);
    });

    test('button is rendered', async () => {
        await screen.findByRole('button', { name: /set password/i });
    });

    test('password input works', async () => {
        const passwordInput = await screen.findByLabelText(/password:/i);
        await userEvent.type(passwordInput, 'test');
        expect(passwordInput).toHaveValue('test');
    });

    test('confirm password input works', async () => {
        const confirmPasswordInput = await screen.findByLabelText(/password repeat:/i);
        await userEvent.type(confirmPasswordInput, 'test');
        expect(confirmPasswordInput).toHaveValue('test');
    });

    test('successful password reset', async () => {
        const user = userEvent.setup();

        await screen.findByTestId('reset-password-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput = await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightChar$');

        const button = await screen.findByRole('button', { name: /set password/i });
        await user.click(button);

        await screen.findByText(/password change successful/i);
    });

    test('failed password reset', async () => {
        server.use(
            http.post(`${baseURL}/v1/account/change-password`, () => {
                return new HttpResponse(null, {
                    status: 403
                })
            }),
        )

        const user = userEvent.setup();

        await screen.findByTestId('reset-password-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput = await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightChar$');

        const button = await screen.findByRole('button', { name: /set password/i });
        await user.click(button);

        await screen.findByText(/error while setting/i);
    });

    test('connection error on password reset', async () => {
        server.use(
            http.post(`${baseURL}/v1/account/change-password`, () => {
                return new HttpResponse.error();
            }),
        )

        const user = userEvent.setup();

        await screen.findByTestId('reset-password-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput = await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightChar$');

        const button = await screen.findByRole('button', { name: /set password/i });
        await user.click(button);

        await screen.findByText(/error while setting/i);
    });

    test('passwords do not match', async () => {
        const user = userEvent.setup();

        await screen.findByTestId('reset-password-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput = await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightCar$');

        const button = await screen.findByRole('button', { name: /set password/i });
        expect(button).toBeDisabled();

        await screen.findByText(/passwords do not match/i);
    });

    test('password too short', async () => {
        const user = userEvent.setup();

        await screen.findByTestId('reset-password-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput = await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'e');
        await user.type(confirmPasswordInput, 'e');

        const button = await screen.findByRole('button', { name: /set password/i });
        expect(button).toBeDisabled();

        await screen.findByText(/at least 8 characters/i);
    });

    test('password contains no special character', async () => {
        const user = userEvent.setup();

        await screen.findByTestId('reset-password-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput = await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eeeeeeee');
        await user.type(confirmPasswordInput, 'eeeeeeee');

        const button = await screen.findByRole('button', { name: /set password/i });
        expect(button).toBeDisabled();

        await screen.findByText(/at least one special character/i);
    });
});