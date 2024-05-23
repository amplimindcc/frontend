import { vi } from 'vitest';
import AuthProvider from '../../../../components/AuthProvider/AuthProvider';
import LangProvider from '../../../../components/LangProvider/LangProvider';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UsersPage from './Users';
import { describe } from 'node:test';
beforeEach(() => {
    Object.defineProperty(navigator, 'language', {
        value: 'en',
        configurable: true,
    });

    render(
        <AuthProvider>
            <LangProvider>
                <Router>
                    <UsersPage />
                </Router>
                <ToastContainer />
            </LangProvider>
        </AuthProvider>
    );
});

describe('Users', () => {
    test('heading is rendered', async () => {
        await screen.getByRole('heading', { name: /user management/i });
    });

    test('content div is rendered', async () => {
        await screen.getByTestId('user-management-content');
    });
});

afterEach(() => {
    vi.clearAllMocks();
});
