import { Action } from './Action';

/**
 * Interface for the data that is passed to the ConfirmationModal on the user management page
 * @author David Linhardt
 *
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
