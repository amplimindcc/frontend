import ModalProps from '../../interfaces/ModalProps';
import { useState, useEffect, useRef } from 'react';
import './Modal.css';
import Button from '../Button/Button';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';

const Modal: React.FC<ModalProps> = ({
    isOpen,
    hasCloseButton = true,
    onClose,
    children,
}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    };

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
