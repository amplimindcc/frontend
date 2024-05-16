import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AuthProvider from '../../components/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './Login'
import { ToastContainer } from 'react-toastify';

import { authenticated, checkAdmin, login} from '../../services/user'

beforeEach(() => {
    vi.mock('../../services/user', async () => {
        const user = await vi.importActual('../../services/user');

        return {
            ...user,
            authenticated: vi.fn(),
            checkAdmin: vi.fn(),
            login: vi.fn(),
        };
    });

    vi.mocked(authenticated).mockResolvedValue({
        ok: false
    });
    vi.mocked(checkAdmin).mockResolvedValue({
        ok: true, json: async () => ({ isAdmin: false })
    });

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

    test('successful login', async () => {
        await vi.mocked(login).mockResolvedValue({
            ok: true, status: 200
        });

        const user = userEvent.setup()

        const form = await screen.findByTestId("login-form");
        assert(form !== null);

        const email = screen.getByLabelText(/email/i);
        await user.type(email, 'user@web.de');

        const password = screen.getByLabelText(/password/i);
        await user.type(password, 'user');

        const button = screen.getByRole('button', { name: /login/i });
        await user.click(button);

        await screen.findByText(/login successful/i);
    });

    test('unsuccessful login', async () => {
        await vi.mocked(login).mockResolvedValue({
            ok: false, status: 403
        });

        await screen.findByTestId("login-form");

        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: /login/i });
        await user.click(button);

        await screen.findByText(/Invalid email or password/i);
    });
});

afterEach(() => {
    vi.clearAllMocks();
});