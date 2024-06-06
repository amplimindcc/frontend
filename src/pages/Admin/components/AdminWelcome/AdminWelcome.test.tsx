import { render, screen } from '@testing-library/react';
import { beforeEach, describe, test } from 'vitest';
import AuthProvider from '../../../../components/AuthProvider/AuthProvider';
import LangProvider from '../../../../components/LangProvider/LangProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminWelcome from './AdminWelcome';

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
                        <AdminWelcome />
                    </Router>
                    <ToastContainer />
                </LangProvider>
            </AuthProvider>
        </>
    );
});

describe('AdminWelcome', () => {
    test('renders admin welcome page', async () => {
        await screen.findByTestId('admin-welcome');
    });

    test('renders admin signed in text', async () => {
        await screen.findByTestId('admin-signed-in-text');
    });

    test('renders email of signed in admin', async () => {
        await screen.findByText(/test@test.de/i);
    });
});
