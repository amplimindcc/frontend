import { Action } from './Action';

/**
 * Enum for possible operations on users
 * @export
 * @interface ConfirmationModalData
 * @typedef {ConfirmationModalData}
 */
export default interface ConfirmationModalData {
    /**
     * Action to be performed
     */
    action: Action;
    /**
     * Email of the user
     */
    email: string;
    /**
     * Admin status of the user
     */
    admin: boolean;
}
