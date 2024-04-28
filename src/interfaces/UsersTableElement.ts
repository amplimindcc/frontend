/**
 * Single User Object for the UsersTable
 *
 * @export
 * @interface
 * @typedef {UsersTableElement}
 */
export default interface UsersTableElement {
    /**
     * Email of the User
     */
    email: string;
    /**
     * Admin status of the User
     */
    admin: boolean;
    /**
     * Users registration status
     */
    status: string;
    /**
     * Shows if the User can be reinvited
     */
    canBeReinvited: boolean;
    /**
     * Token expiration date
     */
    inviteTokenExpiration: string;
}
