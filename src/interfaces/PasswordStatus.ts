/**
 * Interface for password status
 *
 * @export
 * @interface PasswordStatus
 * @typedef {PasswordStatus}
 */
export default interface PasswordStatus {
    /**
     * Password validity
     */
    isValid: boolean;
    /**
     * Message to display
     */
    message: string;
}
