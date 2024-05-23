import ModalProps from '../../interfaces/ModalProps';
import React, { useState, useEffect, useRef } from 'react';
import './Modal.css';
import Button from '../Button/Button';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';

/**
 * Modal component used to display a modal dialog.
 * @author David Linhardt
 *
 * @param {ModalProps} param0
 * @param {ModalProps} param0.isOpen
 * @param {ModalProps} [param0.hasCloseButton=true]
 * @param {ModalProps} param0.onClose
 * @param {ModalProps} param0.children
 * @returns {React.ReactNode}
 */
const Modal = ({
    isOpen,
    hasCloseButton = true,
    onClose,
    children,
}: ModalProps) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    /**
     * Handle the closing of the modal dialog.
     * @author David Linhardt
     * @returns {void}
     */
    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    };

    /**
     * Handle the key down event for the modal dialog to close it when the escape key is pressed.
     * @author David Linhardt
     *
     * @param {React.KeyboardEvent<HTMLDialogElement>} event
     * @returns {void}
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement && !modalElement.showModal) {
            dialogPolyfill.registerDialog(modalElement);
        }
    }, []);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                // Check if the dialog is open before attempting to close it
                if (modalElement.hasAttribute('open')) {
                    modalElement.close();
                }
            }
        }
    }, [isModalOpen]);

    return (
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
            {hasCloseButton && (
                <div className="modal-close-button-container">
                    <Button text="X" handleClick={handleCloseModal} />
                </div>
            )}
            {children}
        </dialog>
    );
};

export default Modal;
