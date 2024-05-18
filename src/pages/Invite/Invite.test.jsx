import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AuthProvider from '../../components/AuthProvider';;
import InvitePage from './Invite'
import { ToastContainer } from 'react-toastify';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import { expect } from 'vitest';
import { findDOMNode } from 'react-dom';
import Loader from '../../components/Loader/Loader';

const baseURL = import.meta.env.VITE_API_URL;
let token = '';

function renderInvite() {
    render(
        <>
            <AuthProvider>
                <MemoryRouter initialEntries={[`/invite/${token}`]}>
                    <Routes>
                        <Route path="/invite/:token" element={<InvitePage />} />
                    </Routes>
                </MemoryRouter>
                <ToastContainer />
            </AuthProvider>
        </>
    );
}

function mockToken(token) {
    switch (token) {
        case null:
            server.use(
                http.get(`${baseURL}/v1/auth/check-token/${token}`, () => {
                    return new HttpResponse(null, {
                        status: StatusCodes.BAD_REQUEST
                    })
                }),
            );
            break;
        case 'expired-token':
            server.use(
                http.get(`${baseURL}/v1/auth/check-token/${token}`, () => {
                    return new HttpResponse(null, {
                        status: StatusCodes.FORBIDDEN
                    })
                }),
            );
            break;
        case 'already-used-token':
            server.use(
                http.get(`${baseURL}/v1/auth/check-token/${token}`, () => {
                    return new HttpResponse(null, {
                        status: StatusCodes.CONFLICT
                    })
                }),
            );
            break;
        case 'valid-token':
            server.use(
                http.get(`${baseURL}/v1/auth/check-token/${token}`, () => {
                    return new HttpResponse(null, {
                        status: StatusCodes.OK
                    })
                }),
            );
            break;
        default:
            server.use(
                http.get(`${baseURL}/v1/auth/check-token/${'valid-token'}`, () => {
                    return new HttpResponse(null, {
                        status: StatusCodes.OK
                    })
                }),
            );
            break;
    }
}

afterEach(() => {
    cleanup();
});

describe('Invite', () => {
    test('token is null', async () => {
        token = null;
        mockToken(token);

        renderInvite();

        await screen.findByTestId('loader');
        await screen.findByText(/invite token invalid/i);
    });

    test('token is expired', async () => {
        token = 'expired-token';
        mockToken(token);

        renderInvite();

        await screen.findByTestId('loader');
        await screen.findByText(/invite token expired/i);
    });

    test('token was already used', async () => {
        token = 'already-used-token';
        mockToken(token);

        renderInvite();

        await screen.findByTestId('loader');
        await screen.findByText(/invite token already used/i);
    });

    test('form is rendered on valid token', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        await screen.findByTestId('register-form');
    });

    test('renders password input', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        await screen.findByLabelText(/password:/i);
    });

    test('renders confirm password input', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        await screen.findByLabelText(/password repeat:/i);
    });

    test('button is rendered', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        await screen.findByRole('button', { name: /set password/i });
    });

    test('password input works', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        const passwordInput = await screen.findByLabelText(/password:/i);
        await userEvent.type(passwordInput, 'test');
        expect(passwordInput).toHaveValue('test');
    });

    test('confirm password input works', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        const confirmPasswordInput = await screen.findByLabelText(/password repeat:/i);
        await userEvent.type(confirmPasswordInput, 'test');
        expect(confirmPasswordInput).toHaveValue('test');
    });

    test('successful registration', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        const user = userEvent.setup();

        await screen.findByTestId('register-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput =
            await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightChar$');

        const button = await screen.findByRole('button', {
            name: /set password/i,
        });
        await user.click(button);

        await screen.findByText(/password set/i);
    });

    test('send invalid token', async () => {
        token = 'valid-token';
        mockToken(token);

        server.use(
            http.post(`${baseURL}/v1/auth/register`, () => {
                return new HttpResponse(null, {
                    status: StatusCodes.BAD_REQUEST
                })
            }),
        );

        renderInvite();

        const user = userEvent.setup();

        await screen.findByTestId('register-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput =
            await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightChar$');

        const button = await screen.findByRole('button', {
            name: /set password/i,
        });
        await user.click(button);

        await screen.findByText(/invalid token/i);
    });

    test('send expired token', async () => {
        token = 'valid-token';
        mockToken(token);

        server.use(
            http.post(`${baseURL}/v1/auth/register`, () => {
                return new HttpResponse(null, {
                    status: StatusCodes.FORBIDDEN
                })
            }),
        );

        renderInvite();

        const user = userEvent.setup();

        await screen.findByTestId('register-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput =
            await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightChar$');

        const button = await screen.findByRole('button', {
            name: /set password/i,
        });
        await user.click(button);

        await screen.findByText(/token is expired/i);
    });

    test('send token for non existing user', async () => {
        token = 'valid-token';
        mockToken(token);

        server.use(
            http.post(`${baseURL}/v1/auth/register`, () => {
                return new HttpResponse(null, {
                    status: StatusCodes.NOT_FOUND
                })
            }),
        );

        renderInvite();

        const user = userEvent.setup();

        await screen.findByTestId('register-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput =
            await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightChar$');

        const button = await screen.findByRole('button', {
            name: /set password/i,
        });
        await user.click(button);

        await screen.findByText(/user does not exist/i);
    });

    test('send already used token', async () => {
        token = 'valid-token';
        mockToken(token);

        server.use(
            http.post(`${baseURL}/v1/auth/register`, () => {
                return new HttpResponse(null, {
                    status: StatusCodes.CONFLICT
                })
            }),
        );

        renderInvite();

        const user = userEvent.setup();

        await screen.findByTestId('register-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput =
            await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightChar$');

        const button = await screen.findByRole('button', {
            name: /set password/i,
        });
        await user.click(button);

        await screen.findByText(/token was already used/i);
    });

    test('send too weak password', async () => {
        token = 'valid-token';
        mockToken(token);

        server.use(
            http.post(`${baseURL}/v1/auth/register`, () => {
                return new HttpResponse(null, {
                    status: StatusCodes.PRECONDITION_FAILED
                })
            }),
        );

        renderInvite();

        const user = userEvent.setup();

        await screen.findByTestId('register-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput =
            await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightChar$');

        const button = await screen.findByRole('button', {
            name: /set password/i,
        });
        await user.click(button);

        await screen.findByText(/password is too weak/i);
    });

    test('passwords do not match', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        const user = userEvent.setup();

        await screen.findByTestId('register-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput =
            await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eightChar$');
        await user.type(confirmPasswordInput, 'eightCar$');

        const button = await screen.findByRole('button', {
            name: /set password/i,
        });
        expect(button).toBeDisabled();

        await screen.findByText(/passwords do not match/i);
    });

    test('password too short', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        const user = userEvent.setup();

        await screen.findByTestId('register-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput =
            await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'e');
        await user.type(confirmPasswordInput, 'e');

        const button = await screen.findByRole('button', {
            name: /set password/i,
        });
        expect(button).toBeDisabled();

        await screen.findByText(/at least 8 characters/i);
    });

    test('password contains no special character', async () => {
        token = 'valid-token';
        mockToken(token);

        renderInvite();

        const user = userEvent.setup();

        await screen.findByTestId('register-form');

        const passwordInput = await screen.findByLabelText(/password:/i);
        const confirmPasswordInput =
            await screen.findByLabelText(/password repeat:/i);
        await user.type(passwordInput, 'eeeeeeee');
        await user.type(confirmPasswordInput, 'eeeeeeee');

        const button = await screen.findByRole('button', {
            name: /set password/i,
        });
        expect(button).toBeDisabled();

        await screen.findByText(/at least one special character/i);
    });
});
