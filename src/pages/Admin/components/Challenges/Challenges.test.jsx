import { expect, vi } from 'vitest';
import AuthProvider from '../../../../components/AuthProvider/AuthProvider';
import LangProvider from '../../../../components/LangProvider/LangProvider';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Challenges from './Challenges';
import { within } from '@testing-library/react';
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
                    <Challenges />
                </Router>
                <ToastContainer />
            </LangProvider>
        </AuthProvider>
    );

    vi.advanceTimersByTime();
});

describe('Challenges', () => {
    test('heading is rendered', async () => {
        await screen.getByRole('heading', { name: /challenges/i });
    });

    test('challenges table container is rendered', async () => {
        await screen.getByTestId('challenges-table-container');
    });

    test('challenges table headers are rendered', async () => {
        vi.useRealTimers();
        const container = await screen.getByTestId('challenges-table-container');
        const scopedQueries = within(container);
        const headerElements = scopedQueries.getAllByText(
            (content, element) => {
                return (
                    element.classList.contains('ag-header-cell-text') &&
                    content.match(
                        /ID|Active|Description|Delete/i
                    )
                );
            }
        );
        expect(headerElements).toHaveLength(4);
        expect(headerElements[0]).toHaveTextContent(/ID/i);
        expect(headerElements[1]).toHaveTextContent(/Active/i);
        expect(headerElements[2]).toHaveTextContent(/Description/i);
        expect(headerElements[3]).toHaveTextContent(/Delete/i);
    });

    test('fieldset is rendered', async () => {
        await screen.getByTestId('challenges-fieldset');
    });

    test('legend is rendered', async () => {
        await screen.getByTestId('add-challenge-legend');
    });

    test('add challenge container is rendered', async () => {
        await screen.getByTestId('add-challenge-container');
    });

    test('challenge title input rendered', async () => {
        await screen.getByTestId('title-input');
    });

    test('challenge description input rendered', async () => {
        await screen.getByTestId('editor');
    });

    test('challenge title input works', async () => {
        vi.useRealTimers();
        const titleInput = await screen.findByTestId('title-input');
        await userEvent.type(titleInput, 'test');
        expect(titleInput).toHaveValue('test');
    });

    test('add challenge form rendered', async () => {
        await screen.getByTestId('add-challenge-form');
    })

    test('add challenge form container rendered', async () => {
        await screen.getByTestId('add-challenge-form-container');
    })

    test('add challenge submit section rendered', async () => {
        await screen.getByTestId('add-challenge-submit-section');
    })

    test('add challenge button is rendered', async () => {
        await screen.getByRole('button', { name: /add challenge/i });
    });
});

afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
});