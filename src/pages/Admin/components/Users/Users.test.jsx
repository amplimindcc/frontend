import { expect, vi } from 'vitest';
import AuthProvider from '../../../../components/AuthProvider/AuthProvider';
import LangProvider from '../../../../components/LangProvider/LangProvider';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UsersPage from './Users';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';

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

    test('users table headers are rendered', async () => {
        vi.useRealTimers();
        const container = await screen.getByTestId('users-table-container');
        const scopedQueries = within(container);
        const headerElements = scopedQueries.getAllByText(
            (content, element) => {
                return (
                    element.classList.contains('ag-header-cell-text') &&
                    content.match(
                        /Email|State|Admin|Invite Token Expiration|Delete|Reinvite/i
                    )
                );
            }
        );
        expect(headerElements).toHaveLength(6);
        expect(headerElements[0]).toHaveTextContent(/Email/i);
        expect(headerElements[1]).toHaveTextContent(/State/i);
        expect(headerElements[2]).toHaveTextContent(/Admin/i);
        expect(headerElements[3]).toHaveTextContent(/Invite Token Expiration/i);
        expect(headerElements[4]).toHaveTextContent(/Delete/i);
        expect(headerElements[5]).toHaveTextContent(/Reinvite/i);
    });

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

    test('button is disabled on invalid email', async () => {
        vi.useRealTimers();
        const emailInput = await screen.findByTestId('add-user-email-input');
        await userEvent.type(emailInput, 'test');
        const button = await screen.findByRole('button', { name: /add user/i });
        expect(button).toBeDisabled();
    });

    test('button is enabled on valid email', async () => {
        vi.useRealTimers();
        const emailInput = await screen.findByTestId('add-user-email-input');
        await userEvent.type(emailInput, 'name@email.de');
        const button = await screen.findByRole('button', { name: /add user/i });
        expect(button).not.toBeDisabled();
    });

    test('confirmation dialog is rendered after clicking add user', async () => {
        vi.useRealTimers();
        const user = userEvent.setup();
        const emailInput = await screen.findByTestId('add-user-email-input');
        user.type(emailInput, 'name@email.de');
        const button = await screen.findByRole('button', { name: /add user/i });
        await user.click(button);
        await screen.findByTestId('users-confirmation-modal-container');
    });

    test('confirmation message is shown', async () => {
        vi.useRealTimers();
        const user = userEvent.setup();
        const emailInput = await screen.findByTestId('add-user-email-input');
        user.type(emailInput, 'name@email.de');
        const fieldset = await screen.findByTestId('users-fieldset');
        const scope = within(fieldset);
        const button = await scope.getByRole('button', { name: /add user/i });
        await user.click(button);
        await screen.findByTestId('users-confirmation-modal-message');
    });
});

afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
});
