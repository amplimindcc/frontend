import { afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import { server } from './mocks/server';

afterEach(() => {
    server.resetHandlers()
    cleanup()
})

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close()
});