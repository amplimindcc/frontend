import { useEffect, useRef } from 'react';

type Callback = () => void;

/**
 * useInterval custom hook - used similar to useEffect, but for intervals (auto cleanup).
 * @author David Linhardt
 *
 * @param {Callback} callback - callback function
 * @param {(number | null)} delay - delay in milliseconds
 */
function useInterval(callback: Callback, delay: number | null, pause: boolean = false): void {
    const savedCallback = useRef<Callback | null>(null);

    // Remember the latest callback if it changes.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        if (!pause && (delay !== null)) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id); // cleanup
        }
    }, [delay, pause]);
}

export default useInterval;
