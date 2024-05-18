import { handlers } from './api';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);
