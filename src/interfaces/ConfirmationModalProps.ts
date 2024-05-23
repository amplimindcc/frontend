import ConfirmationModalData from './ConfirmationModalData';

/**
 * Properties for the ConfirmationModal component
 * @author David Linhardt
 *
 * @export
 * @interface
 * @typedef {ConfirmationModalProps}
 */
export default interface ConfirmationModalProps {
    /**
     * visibility state
     */
    isOpen: boolean;
    /**
     * Callback executed on submit
     */
    onSubmit: (data: ConfirmationModalData) => void;
    /**
     * Callback executed on close
     */
    onClose: () => void;
    /**
     * Data for the confirmation modal
     * data.action: Action
     * data.email: string
     */
    data: ConfirmationModalData;
}
