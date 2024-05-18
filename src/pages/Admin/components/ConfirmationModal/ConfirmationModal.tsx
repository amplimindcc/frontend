import './ConfirmationModal.css';
import Modal from '../../../../components/Modal/Modal';
import ConfirmationModalProps from '../../../../interfaces/ConfirmationModalProps';
import ConfirmationModalData from '../../../../interfaces/ConfirmationModalData';
import { Action } from '../../../../interfaces/Action';
import Button from '../../../../components/Button/Button';
import { useTranslation } from 'react-i18next';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    onSubmit,
    isOpen,
    onClose,
    data,
}) => {
    const { t } = useTranslation(['admin', 'main']);

    function buildConfirmationMessage(data: ConfirmationModalData): string {
        const status = data.admin ? 'admin' : 'user';
        switch (data.action) {
            case Action.DELETE:
                return t('deleteConfirmation', { status: status, mail: data.email});
            case Action.REINVITE:
                return t('reinviteConfirmation', { status: status, mail: data.email });
            case Action.ADD:
                return t('addConfirmation', { mail: data.email, status: status});
        }
    }

    return (
        <Modal hasCloseButton={true} isOpen={isOpen} onClose={onClose} data-testid='confirmation-modal'>
            {
                <div className='confirmation-modal-content'>
                    <h2>{buildConfirmationMessage(data)}</h2>
                    <div className="confirmation-modal-button-container">
                        <Button text={t('buttonYes', { ns: 'main'})} handleClick={() => onSubmit(data)}/>
                        <Button text={t('buttonNo', { ns: 'main'})} handleClick={onClose}/>
                    </div>
                </div>
            }
        </Modal>
    );
};

export default ConfirmationModal;
