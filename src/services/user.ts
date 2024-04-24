const baseURL = 'http://localhost:8080/v1';

/**
 * Login service: session is set as cookie
 * Use inside try/catch
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
const login = async (email: string, password: string) => {
    const url = `${baseURL}/auth/login`;
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
 * Check if user is authenticated. Returns 200 if authenticated.
 * @returns {Promise}
 */
const authenticated = async () => {
    const url = `${baseURL}/auth/check-login`;

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

    return res;
}

/**
 * List service : list all users
 * @async
 * @returns {Promise}
 */
const list = async () => {
    const url = `${baseURL}/admin/fetch/users/all`;

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
 * @async
 * @param {string} email
 * @param {boolean} isAdmin
 * @returns {Promise}
 */
const add = async (email: string, isAdmin: boolean) => {
    const url = `${baseURL}/admin/invite`;
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

/**
 * Remove service : delete a user
 * @async
 * @param {string} email
 * @returns {Promise}
 */
// delete cant be used as function name
const remove = async (email: string) => {
    const url = `${baseURL}/admin/user/${email}`;

    const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res;
};

/**
 * Usermod service : change user role
 * @async
 * @param email
 * @param admin
 * @returns {Promise}
 */
const usermod = async (email: string, admin: boolean) => {
    const url = `${baseURL}/admin/change/role`;

    const newRole = admin ? 'ADMIN' : 'USER';

    const res = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newRole }),
    });

    return res;
};

/**
 * checkAdmin service : check if user is admin
 * @async
 * @returns {Promise}
 */
const checkAdmin = async () => {
    const url = `${baseURL}/user/check-admin`;

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
 * requestPasswordChange service : request password change email
 * @async
 * @param {string} email
 * @returns {Promise}
 */
const requestPasswordChange = async (email: string) => {
    const url = `${baseURL}/account/request-password-change/${email}`;

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res;
};

/**
 * changePassword service : change password
 * @async
 * @param {string} token (from URL)
 * @param {string} newPassword
 * @returns {Promise}
 */
const changePassword = async (token: string, newPassword: string) => {
    const url = `${baseURL}/account/change-password`;

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
    });

    return res;
};

export default { login, authenticated, list, add, remove, usermod, checkAdmin, requestPasswordChange, changePassword };