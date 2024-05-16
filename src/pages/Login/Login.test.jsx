    import { render, screen } from '@testing-library/react'
    import userEvent from '@testing-library/user-event'

    import AuthProvider from '../../components/AuthProvider';
    import { BrowserRouter as Router } from 'react-router-dom';
    import Login from './Login'
    import { ToastContainer } from 'react-toastify';

    import { authenticated, checkAdmin, login } from '../../services/user';

    vi.mock('../../services/user', () => ({
        authenticated: vi.fn(),
        checkAdmin: vi.fn(),
        login: vi.fn(),
    }));

    beforeEach(() => {
        authenticated.mockResolvedValue({ ok: false });
        checkAdmin.mockResolvedValue({ ok: true, json: async () => ({ isAdmin: false }) });

        render(
            <>
                <AuthProvider>
                    <Router>
                        <Login />
                    </Router>
                    <ToastContainer />
                </AuthProvider>
            </>
        );
    });

    describe('Login', () => {
        test('form is rendered', async () => {
            screen.getByTestId('login-form');
        });

        test('renders email input', () => {
            screen.getByLabelText(/email/i);
        });

        test('renders password input', () => {
            screen.getByLabelText(/password/i);
        });

        test('renders login button', () => {
            screen.getByRole('button', { name: /login/i });
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

        test('unsuccessful login', async () => {
            login.mockResolvedValue({ ok: false, status: 403 });

            await screen.findByTestId("login-form");

            const user = userEvent.setup();
            const button = screen.getByRole('button', { name: /login/i });
            await user.click(button);

            await screen.findByText(/Invalid email or password/i);
        });
    });