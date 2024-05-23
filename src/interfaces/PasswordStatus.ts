/**
 * Interface for password status
 * @author David Linhardt
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
