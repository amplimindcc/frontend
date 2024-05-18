import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
    test('button is rendered', async () => {
        render(<Button text="Click Me" />);

        await screen.findByRole('button');
    });

    test('button text is correct', async () => {
        render(<Button text="Click Me" />);

        await screen.findByText(/click me/i);
    });

    test('button is clickable', async () => {
        const mockHandler = vi.fn();

        render(<Button text="Click Me" handleClick={mockHandler} />);

        const button = await screen.findByRole('button');
        const user = userEvent.setup();
        await user.click(button);

        expect(mockHandler.mock.calls).toHaveLength(1);
    });

    test('button is disabled', async () => {
        render(<Button text="Click Me" disabled />);

        const button = await screen.findByRole('button');
        expect(button).toBeDisabled();
    });

    test('button is loading', async () => {
        render(<Button text="Click Me" loading={true} />);

        const button = await screen.findByRole('button');
        expect(button.firstChild.classList.contains('loader-in-button')).toBe(
            true
        );
    });
});
