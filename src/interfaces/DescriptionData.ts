/**
 * Enum for possible operations on users
 * @export
 * @interface DescriptionModalData
 * @typedef {DescriptionData}
 */
export default interface DescriptionData {
    /**
     * ID of the challenge
     */
    id: number;
    /**
     * Description of the challenge
     */
    description: string;
    /**
     * OnChange function for the description
     */
    onChange: (description: string) => void;
    /**
     * Enabled/Disables editing
     */
    isEditingEnabled: boolean;
}
