import { SubmissionState } from "./SubmissionState";
/**
 * Single user object for the SubmissionsTable
 *
 * @export
 * @interface
 * @typedef {UserSubmissionTableElement}
 */
export default interface UserSubmissionTableElement {
    /**
     * Email of the user
     */
    email: string;
    /**
     * ID of the submission
     */
    id: number;
    /**
     * Link to the github repo of the User
     */
    link: string;
    /**
     * State of the coding challenge
     */
    state: SubmissionState;

}