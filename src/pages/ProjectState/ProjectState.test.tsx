import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '../../components/AuthProvider/AuthProvider';
import LangProvider from '../../components/LangProvider/LangProvider';
import ProjectState from './ProjectState';
import { server } from '../../../mocks/server';
import { HttpResponse, http } from 'msw';

const baseURL = import.meta.env.VITE_API_URL;

beforeEach(() => {
    Object.defineProperty(navigator, 'language', {
        value: 'en',
        configurable: true,
    });
});

describe('ProjectState', () => {
    test('renders project state page', async () => {
        render(
            <AuthProvider>
                <LangProvider>
                    <Router>
                        <ProjectState />
                    </Router>
                    <ToastContainer />
                </LangProvider>
            </AuthProvider>
        );

        await screen.findByTestId('project-state');
    });

    test('reroutes if project state is INIT', async () => {
        server.use(
            http.get(`${baseURL}/v1/submission/active`, () => {
                return HttpResponse.json({
                    submissionStates: 'INIT',
                });
            })
        );

        render(
            <AuthProvider>
                <LangProvider>
                    <Router>
                        <ProjectState />
                    </Router>
                    <ToastContainer />
                </LangProvider>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(window.location.pathname).toBe('/project/start');
        });
    });

    test('reroutes if project state is IN_IMPLEMENTATION', async () => {
        server.use(
            http.get(`${baseURL}/v1/submission/active`, () => {
                return HttpResponse.json({
                    submissionStates: 'IN_IMPLEMENTATION',
                });
            })
        );

        render(
            <AuthProvider>
                <LangProvider>
                    <Router>
                        <ProjectState />
                    </Router>
                    <ToastContainer />
                </LangProvider>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(window.location.pathname).toBe('/project/commit');
        });
    });

    test('renders project in review', async () => {
        server.use(
            http.get(`${baseURL}/v1/submission/active`, () => {
                return HttpResponse.json({
                    submissionStates: 'SUBMITTED',
                });
            })
        );

        render(
            <AuthProvider>
                <LangProvider>
                    <Router>
                        <ProjectState />
                    </Router>
                    <ToastContainer />
                </LangProvider>
            </AuthProvider>
        );

        await screen.findByTestId('project-in-review');
    });

    test('renders project reviewed', async () => {
        server.use(
            http.get(`${baseURL}/v1/submission/active`, () => {
                return HttpResponse.json({
                    submissionStates: 'REVIEWED',
                });
            })
        );

        render(
            <AuthProvider>
                <LangProvider>
                    <Router>
                        <ProjectState />
                    </Router>
                    <ToastContainer />
                </LangProvider>
            </AuthProvider>
        );

        await screen.findByTestId('project-reviewed');
    });
});
