import './ConfirmationModal.css';
import Modal from '../../../../components/Modal/Modal';
import ConfirmationModalProps from '../../../../interfaces/ConfirmationModalProps';
import ConfirmationModalData from '../../../../interfaces/ConfirmationModalData';
import { Action } from '../../../../interfaces/Action';
import Button from '../../../../components/Button/Button';
import { useTranslation } from 'react-i18next';

/**
 * Confirmation modal component used in the admin user management page.
 * @author David Linhardt
 *
 * @param {ConfirmationModalProps} param0
 * @param {ConfirmationModalProps} param0.onSubmit
 * @param {ConfirmationModalProps} param0.isOpen
 * @param {ConfirmationModalProps} param0.onClose
 * @param {ConfirmationModalProps} param0.data
 * @returns {React.ReactNode}
 */
const ConfirmationModal = ({
    onSubmit,
    isOpen,
    onClose,
    data,
}: ConfirmationModalProps) => {
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['admin', 'main']);

    /**
     * Builds the confirmation message based on the action and the user status.
     * @author David Linhardt
     *
     * @param {ConfirmationModalData} data
     * @returns {string}
     */
    function buildConfirmationMessage(data: ConfirmationModalData): string {
        const status = data.admin ? 'admin' : 'user';
        switch (data.action) {
            case Action.DELETE:
                return t('deleteConfirmation', {
                    status: status,
                    mail: data.email,
                });
            case Action.REINVITE:
                return t('reinviteConfirmation', {
                    status: status,
                    mail: data.email,
                });
            case Action.ADD:
                return t('addConfirmation', {
                    mail: data.email,
                    status: status,
                });
        }
    }

    return (
        <Modal
            hasCloseButton={true}
            isOpen={isOpen}
            onClose={onClose}
            data-testid="confirmation-modal"
        >
            {
                <div
                    className="confirmation-modal-content"
                    data-testid="users-confirmation-modal-container"
                >
                    <h2 data-testid="users-confirmation-modal-message">
                        {buildConfirmationMessage(data)}
                    </h2>
                    <div className="confirmation-modal-button-container">
                        <Button
                            text={t('buttonYes', { ns: 'main' })}
                            handleClick={() => onSubmit(data)}
                        />
                        <Button
                            text={t('buttonNo', { ns: 'main' })}
                            handleClick={onClose}
                        />
                    </div>
                </div>
            }
        </Modal>
    );
};

export default ConfirmationModal;
