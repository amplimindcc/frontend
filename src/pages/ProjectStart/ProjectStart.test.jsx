import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthProvider from '../../components/AuthProvider';
import LangProvider from '../../components/LangProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectStart from './ProjectStart';
import { ToastContainer } from 'react-toastify';

import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';

const baseURL = import.meta.env.VITE_API_URL;

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
                        <ProjectStart />
                    </Router>
                    <ToastContainer />
                </LangProvider>
            </AuthProvider>
        </>
    );
});

describe('ProjectStart', () => {
    test('renders project start page', async () => {
        await screen.findByTestId('project-start');
    });

    test('renders start button', async () => {
        await screen.findByRole('button', { name: /start/i });
    });

    test('renders project expired', async () => {
        server.use(
            http.get(`${baseURL}/v1/submission/active`, () => {
                return HttpResponse.json({
                    isExpired: true,
                    isStarted: false,
                });
            })
        );

        render(
            <>
                <AuthProvider>
                    <LangProvider>
                        <Router>
                            <ProjectStart />
                        </Router>
                        <ToastContainer />
                    </LangProvider>
                </AuthProvider>
            </>
        );

        await screen.findByTestId('project-expired');
    });

    test('start button inits challenge', async () => {
        const user = userEvent.setup();

        const startButton = await screen.findByRole('button', {
            name: /start/i,
        });
        await user.click(startButton);

        // await screen.findByText(/Welcome to your Coding Challenge/i);
    });

    test('network error when starting challenge', async () => {
        server.use(
            http.get(`${baseURL}/v1/project/fetch`, () => {
                return HttpResponse.error();
            })
        );

        const user = userEvent.setup();

        const startButton = await screen.findByRole('button', {
            name: /start/i,
        });
        await user.click(startButton);

        await screen.findByText(/Connection error./i);
    });
});
