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
}
