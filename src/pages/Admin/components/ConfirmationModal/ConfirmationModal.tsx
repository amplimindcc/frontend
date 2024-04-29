import { useState, useEffect, useRef } from 'react';
import './ConfirmationModal.css';
import Modal from '../../../../components/Modal/Modal';
import ConfirmationModalProps from '../../../../interfaces/ConfirmationModalProps';
import ConfirmationModalData from '../../../../interfaces/ConfirmationModalData';
import { Action } from '../../../../interfaces/Action';
import Button from '../../../../components/Button/Button';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    onSubmit,
    isOpen,
    onClose,
    data,
}) => {
    function buildConfirmationMessage(data: ConfirmationModalData): string {
        const status = data.admin ? 'admin' : 'user';
        switch (data.action) {
            case Action.DELETE:
                return `Are you sure you want to delete the ${status} with email ${data.email}?`;
            case Action.REINVITE:
                return `Are you sure you want to reinvite the ${status} with email ${data.email}?`;
            case Action.ADD:
                return `Are you sure you want to add ${data.email} as ${status}?`;
        }
    }

    return (
        <Modal hasCloseButton={true} isOpen={isOpen} onClose={onClose}>
            {
                <div className='confirmation-modal-content'>
                    <h2>{buildConfirmationMessage(data)}</h2>
                    <div className="confirmation-modal-button-container">
                        <Button text='Yes' handleClick={() => onSubmit(data)}/>
                        <Button text='No' handleClick={onClose}/>
                    </div>
                </div>
            }
        </Modal>
    );
};

export default ConfirmationModal;
