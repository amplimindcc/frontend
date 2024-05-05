const baseURL = 'http://localhost:8080/v1';
const baseBaseURL = 'http://localhost:8080';

/**
 * Login service: session is set as cookie
 * http://localhost:8080/swagger-ui/index.html#/auth-controller/login
 * @async
 * @param {string} email
 * @param {string} password
 * @returns {Response} HTTP response
 * @throws {any} connection error
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
 * Register service: register user with initial password
 * http://localhost:8080/swagger-ui/index.html#/auth-controller/invite
 * @async
 * @param token
 * @param password
 * @returns {Response} HTTP response
 * @throws {any} connection error
 */
const register = async (token: string, password: string) => {
    const url = `${baseURL}/auth/register`;

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
    });

    return res;
}

/**
 * Check if user is authenticated. Returns 200 if authenticated.
 * http://localhost:8080/swagger-ui/index.html#/auth-controller/checkLogin
 * @async
 * @returns {Response} HTTP response
 * @throws {any} connection error
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
 * Check if token is valid. Returns 200 if valid. 400 if invalid. 403 if expired.
 * http://localhost:8080/swagger-ui/index.html#/auth-controller/checkTokenValidity
 * @async
 * @param {String} token
 * @returns {Response} HTTP response
 * @throws {any} connection error
 */
const checkToken = async (token: string) => {
    const url = `${baseURL}/auth/check-token/${token}`;

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res;
}

/**
 * List service : list all users
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/fetchAllUsers
 * @async
 * @returns {Response} HTTP response
 * @throws {any} connection error
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
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/createInvite
 * @async
 * @param {string} email
 * @param {boolean} isAdmin
 * @returns {Response} HTTP response
 * @throws {any} connection error
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
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/deleteUserByEmail
 * @async
 * @param {string} email
 * @returns {Response} HTTP response
 * @throws {any} connection error
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
 * @deprecated
 * @async
 * @param email
 * @param admin
 * @returns {Response} HTTP response
 * @throws {any} connection error
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
 * http://localhost:8080/swagger-ui/index.html#/user-controller/requestIsAdmin
 * @async
 * @returns {Response} HTTP response
 * @throws {any} connection error
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
 * http://localhost:8080/swagger-ui/index.html#/account-controller/requestPasswordReset
 * @async
 * @param {string} email
 * @returns {Response} HTTP response
 * @throws {any} connection error
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
 * http://localhost:8080/swagger-ui/index.html#/account-controller/changePassword
 * @async
 * @param {string} token (from URL)
 * @param {string} newPassword
 * @returns {Response} HTTP response
 * @throws {any} connection error
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

/**
 * Logout service : logout user
 * Not documented in swagger - default spring security logout
 * @async
 * @returns {Response} HTTP response
 * @throws {any} connection error
 */
const logout = async () => {
    const url = `${baseBaseURL}/logout`;

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
 * Resend invite service : resend invite email with new token
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/resendInvite
 * @async
 * @param {string} email
 * @returns {Response} HTTP response
 * @throws {any} connection error
 */
const resendInvite = async (email: string, isAdmin: boolean) => {
    const url = `${baseURL}/admin/resend/invite`;

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

export default {
    login,
    register,
    authenticated,
    checkToken,
    list,
    add,
    remove,
    usermod,
    checkAdmin,
    requestPasswordChange,
    changePassword,
    logout,
    resendInvite,
};