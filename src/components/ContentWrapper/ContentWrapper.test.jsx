import AuthProvider from '../AuthProvider/AuthProvider';
import ContentWrapper from './ContentWrapper';
import LangProvider from '../LangProvider/LangProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import { server } from '../../../mocks/server';
import { http, HttpResponse } from 'msw';

const baseURL = import.meta.env.VITE_API_URL;

beforeEach(() => {
    Object.defineProperty(navigator, 'language', {
        value: 'en',
        configurable: true,
    });

    render(
        <AuthProvider>
            <LangProvider>
                <Router>
                    <ContentWrapper>
                        <div data-testid="child-component" />
                    </ContentWrapper>
                </Router>
                <ToastContainer />
            </LangProvider>
        </AuthProvider>
    );
});

describe('ContentWrapper', () => {
    test('renders child', async () => {
        await screen.findByTestId('child-component');
    });

    test('renders correct email address', async () => {
        await screen.findByText(/test@test.de/i);
    });

    test('renders footer links', async () => {
        await screen.findByRole('link', { name: /imprint/i });
        await screen.findByRole('link', { name: /amplimind/i });
        await screen.findByRole('link', { name: /github/i });
    });

    test('renders license text', async () => {
        await screen.findByTestId('license-text');
    });

    test('renders logo', async () => {
        await screen.findByTestId('logo');
    });

    test('renders language switcher', async () => {
        await screen.findByTestId('language-selector');
    });

    test('shows loader page if not authenticated', async () => {
        server.use(
            http.get(`${baseURL}/v1/auth/check-login`, () => {
                return new HttpResponse(null, {
                    status: 403,
                });
            })
        );
        await screen.findByTestId('loader-page');
    });
});
