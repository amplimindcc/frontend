import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AuthProvider from '../../components/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import LogoutPage from './Logout'
import { ToastContainer } from 'react-toastify';

beforeEach(() => {
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
        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: /logout/i });
        await user.click(button);

        await screen.findByText(/logout successful/i);
    });
});

afterEach(() => {
    vi.clearAllMocks();
});