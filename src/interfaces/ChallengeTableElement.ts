/**
 * Single object for the Challenge Table
 *
 * @export
 * @interface
 * @typedef {ChallengeTableElement}
 */
export default interface ChallengeTableElement {
    /**
     * ID of the challenge
     */
    id: number;
    /**
     * State of the challenge (active/inactive)
     */
    active: boolean;
    /**
     * Title of the challenge
     */
    title: string;
    /**
     * Description of the challenges
     */
    description: string;
}
