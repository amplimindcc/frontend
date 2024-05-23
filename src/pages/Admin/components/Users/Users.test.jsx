import { vi } from 'vitest';
import AuthProvider from '../../../../components/AuthProvider/AuthProvider';
import LangProvider from '../../../../components/LangProvider/LangProvider';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UsersPage from './Users';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    vi.useFakeTimers();

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

    vi.advanceTimersByTime();
});

describe('Users', () => {
    test('heading is rendered', async () => {
        await screen.getByRole('heading', { name: /user management/i });
    });

    test('content div is rendered', async () => {
        await screen.getByTestId('user-management-content');
    });

    test('users table container is rendered', async () => {
        await screen.getByTestId('users-table-container');
    });

    /*
    test('users table is rendered', async () => {
        await screen.findByTestId('users-table');
    });
    */

    test('fieldset is rendered', async () => {
        await screen.getByTestId('users-fieldset');
    });

    test('legend is rendered', async () => {
        await screen.getByTestId('users-legend');
    });

    test('form is rendered', async () => {
        await screen.getByTestId('add-user-form');
    });

    test('form container is rendered', async () => {
        await screen.getByTestId('add-user-form-container');
    });

    test('form email section is rendered', async () => {
        await screen.getByTestId('add-user-form-email-section');
    });

    test('form email input is rendered', async () => {
        await screen.getByTestId('add-user-email-input');
    });

    test('form email input works', async () => {
        vi.useRealTimers();
        const emailInput = await screen.findByTestId('add-user-email-input');
        await userEvent.type(emailInput, 'test');
        expect(emailInput).toHaveValue('test');
    });

    test('form admin input is rendered', async () => {
        vi.useRealTimers();
        await screen.findByTestId('add-user-admin-checkbox');
    });

    test('form admin checkbox default state', async () => {
        vi.useRealTimers();
        const checkbox = await screen.findByTestId('add-user-admin-checkbox');
        expect(checkbox).not.toBeChecked();
    });

    test('form admin checkbox clicked', async () => {
        vi.useRealTimers();
        const user = userEvent.setup();
        const checkbox = await screen.findByTestId('add-user-admin-checkbox');
        await user.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    test('form submit section is rendered', async () => {
        await screen.getByTestId('add-user-form-submit-section');
    });

    test('add user button is rendered', async () => {
        await screen.getByRole('button', { name: /add user/i });
    });
});

afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
});
