import ModalProps from '../../interfaces/ModalProps';
import { useState, useEffect, useRef } from 'react';
import './Modal.css';

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

        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    return (
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
            {hasCloseButton && (
                <div className="modal-close-button-container">
                    <button
                        className="modal-close-button"
                        onClick={handleCloseModal}
                    >
                        X
                    </button>
                </div>
            )}
            {children}
        </dialog>
    );
};

export default Modal;
