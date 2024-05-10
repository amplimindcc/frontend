import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error', () => {
    test('error is rendered', async () => {
        render(
            <Error text="Error Message"/>
        )

        await screen.findByText(/Error Message/i);
    });

    test('error is rendered with custom class', async () => {
        render(
            <Error text="Error Message"/>
        )

        const error = await screen.findByText(/Error Message/i);
        expect(error.classList.contains('error')).toBe(true);
    });

    test('error in not rendered when text is null', async () => {
        render(
            <Error text=""/>
        )

        const error = await screen.queryByText(/Error Message/i);
        expect(error).toBeNull();
    });
});