/**
 * Login service : session is set as cookie
 * @param {string} email
 * @param {string} password
 * @returns {Object}
 */
const login = async (email: string, password: string) => {
    const url = 'http://localhost:8080/v1/auth/login';
    const user = {
        email,
        password,
    };

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return res;
};

/**
 * List service : list all users
 * @returns {Object}
 */
const list = async () => {
    const url = 'http://localhost:8080/v1/admin/fetch/users/all';

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res;
};

/**
 * Add service : add a new user
 * @param {string} email
 * @param {boolean} isAdmin
 * @returns {Object}
 */
const add = async (email: string, isAdmin: boolean ) => {
    const url = 'http://localhost:8080/v1/admin/invite';
    const user = {
        email,
        isAdmin,
    };

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return res;
};

export default { login, list, add };
