import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AuthProvider from '../../components/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import LogoutPage from './Logout'
import { ToastContainer } from 'react-toastify';
import { logout } from '../../services/user'
import { StatusCodes } from 'http-status-codes';
import { after, describe } from 'node:test';

beforeEach(() => {
    vi.mock('../../services/user', async () => {
        const user = await vi.importActual('../../services/user');

        return {
            ...user,
            logout: vi.fn(),
        };
    });

    render(
        <>
            <AuthProvider>
                <Router>
                    <LogoutPage />
                </Router>
                <ToastContainer />
            </AuthProvider>
        </>
    );
});

describe('Logout', () => {
    test('button is rendered', async () => {
        await screen.findByRole('button', { name: /logout/i });
    });

    test('heading is rendered', async () => {
        await screen.findByRole('heading', { name: /logout/i });
    });

    test('successful logout', async () => {
        vi.mocked(logout).mockResolvedValue({
            status: StatusCodes.FORBIDDEN
        });

        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: /logout/i });
        await user.click(button);

        await screen.findByText(/logout successful/i);
    });
});

afterEach(() => {
    vi.clearAllMocks();
});