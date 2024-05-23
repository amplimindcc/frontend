import PasswordStatus from '../interfaces/PasswordStatus';

/**
 * Regex to check if password contains special characters
 * @author David Linhardt
 *
 * @type {RegExp}
 */
const specialCharRegex: RegExp = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

/**
 * Check if password is valid and return status
 * @author David Linhardt
 *
 * @param {string} password
 * @typedef {Object} PasswordStatus
 * @property {boolean} isValid
 * @property {string} message
 * @returns {PasswordStatus}
 */
const check = (password: string): PasswordStatus => {
    if (password.length < 8) {
        return {
            isValid: false,
            message: 'Password must be at least 8 characters long',
        };
    }

    if (!specialCharRegex.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one special character',
        };
    }

    return {
        isValid: true,
        message: '',
    };
};

export default { check };
