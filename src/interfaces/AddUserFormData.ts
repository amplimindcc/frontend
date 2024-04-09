/**
 * Interface for the AddUserForm component
 *
 * @export
 * @interface
 * @typedef {AddUserFormData}
 */
export default interface AddUserFormData {
    /**
     * Email of the user
     */
    email: string;
    /**
     * declares if the user should be added as admin
     */
    admin: boolean;
}