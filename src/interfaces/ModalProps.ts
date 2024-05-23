import React from 'react';

/**
 * Properties for Popup Modal
 * @author David Linhardt
 *
 * @export
 * @interface
 * @typedef {ModalProps}
 */
export default interface ModalProps {
    /**
     * visibility state
     */
    isOpen: boolean;
    /**
     * @optional
     */
    hasCloseButton?: boolean;
    /**
     * @optional
     */
    onClose?: () => void;
    /**
     * contained elements
     */
    children: React.ReactNode;
}
