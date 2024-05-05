import PasswordStatus from "../interfaces/PasswordStatus";

const specialCharRegex: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

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