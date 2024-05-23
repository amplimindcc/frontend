import { handlers } from './api';
import { setupServer } from 'msw/node';

/**
 * Mock Server API
 * @author Steven Burger
 *
 * @type {SetupServerApi}
 */
export const server = setupServer(...handlers);
