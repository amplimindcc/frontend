import { useState, useEffect, useRef } from 'react';
import './ConfirmationModal.css';
import Modal from '../../../../components/Modal/Modal';
import ConfirmationModalProps from '../../../../interfaces/ConfirmationModalProps';
import ConfirmationModalData from '../../../../interfaces/ConfirmationModalData';
import { Action } from '../../../../interfaces/Action';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    onSubmit,
    isOpen,
    onClose,
    data,
}) => {
    function buildConfirmationMessage(data: ConfirmationModalData): string {
        switch (data.action) {
            case Action.DELETE:
                return `Are you sure you want to delete the user with email ${data.email}?`;
            case Action.REINVITE:
                return `Are you sure you want to reinvite the user with email ${data.email}?`;
            case Action.ADD:
                return `Are you sure you want to add the user with email ${data.email}?`;
        }
    }

    return (
        <Modal hasCloseButton={true} isOpen={isOpen} onClose={onClose}>
            {
                <div>
                    <h2>{buildConfirmationMessage(data)}</h2>
                    <div className="confirmation-modal-button-container">
                        <button onClick={() => onSubmit(data)}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                </div>
            }
        </Modal>
    );
};

export default ConfirmationModal;
