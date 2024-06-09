import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
//import userEvent from '@testing-library/user-event';

import AuthProvider from '../../../../components/AuthProvider/AuthProvider';
import LangProvider from '../../../../components/LangProvider/LangProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { within } from '@testing-library/react';
import Submissions from './Submissions';

// const baseURL = import.meta.env.VITE_API_URL;

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
                    <Submissions />
                </Router>
                <ToastContainer />
            </LangProvider>
        </AuthProvider>
    );

    vi.advanceTimersByTime();
});

describe('Submissions', () => {
    test('heading is rendered', async () => {
        await screen.getByRole('heading', { name: /submission management/i });
    });

    test('grid container is rendered', async () => {
        await screen.getByTestId("submission-table-container");
    })

    test('submissions table headers are rendered', async () => {
        vi.useRealTimers();
        const container = await screen.getByTestId('submission-table-container');
        const scopedQueries = within(container);
        const headerElements = scopedQueries.getAllByText(
            (content, element) => {
                return (
                    element.classList.contains('ag-header-cell-text') &&
                    content.match(
                        /Email|Result|State|Turned In|Expiration|ID/i
                    )
                );
            }
        );
        expect(headerElements).toHaveLength(6);
        expect(headerElements[0]).toHaveTextContent(/Email/i);
        expect(headerElements[1]).toHaveTextContent(/Result/i);
        expect(headerElements[2]).toHaveTextContent(/State/i);
        expect(headerElements[3]).toHaveTextContent(/Turned In/i);
        expect(headerElements[4]).toHaveTextContent(/Expiration/i);
        expect(headerElements[5]).toHaveTextContent(/ID/i);
    });
});

afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
});