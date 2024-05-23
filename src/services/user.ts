const baseURL = import.meta.env.VITE_API_URL;

/**
 * Login service: session is set as cookie
 * http://localhost:8080/swagger-ui/index.html#/auth-controller/login
 * @author Steven Burger
 *
 * @async
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const login = async (email: string, password: string) => {
    const url = `${baseURL}/v1/auth/login`;
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
 * @author Steven Burger
 *
 * @async
 * @param {string }token
 * @param {string} password
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const register = async (token: string, password: string) => {
    const url = `${baseURL}/v1/auth/register`;

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
    });

    return res;
};

/**
 * Check if user is authenticated. Returns 200 if authenticated.
 * http://localhost:8080/swagger-ui/index.html#/auth-controller/checkLogin
 * @author Steven Burger
 *
 * @async
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const authenticated = async () => {
    const url = `${baseURL}/v1/auth/check-login`;

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

    return res;
};

/**
 * Check if token is valid. Returns 200 if valid. 400 if invalid. 403 if expired.
 * http://localhost:8080/swagger-ui/index.html#/auth-controller/checkTokenValidity
 * @author Steven Burger
 *
 * @async
 * @param {String} token
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const checkToken = async (token: string) => {
    const url = `${baseURL}/v1/auth/check-token/${token}`;

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
 * List service : list all users
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/fetchAllUsers
 * @author David Linhardt
 * @async
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const list = async () => {
    const url = `${baseURL}/v1/admin/fetch/users/all`;

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
 * @author David Linhardt
 *
 * @async
 * @param {string} email
 * @param {boolean} isAdmin
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const add = async (email: string, isAdmin: boolean) => {
    const url = `${baseURL}/v1/admin/invite`;
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
 * @author David Linhardt
 *
 * @async
 * @param {string} email
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const remove = async (email: string) => {
    const url = `${baseURL}/v1/admin/user/${email}`;

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
 * @author David Linhardt
 *
 * @deprecated
 * @async
 * @param {string} email
 * @param {boolean} admin
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const usermod = async (email: string, admin: boolean) => {
    const url = `${baseURL}/v1/admin/change/role`;

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
 * @author David Linhardt
 *
 * @async
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const checkAdmin = async () => {
    const url = `${baseURL}/v1/user/check-admin`;

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
 * @author David Linhardt
 *
 * @async
 * @param {string} email
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const requestPasswordChange = async (email: string) => {
    const url = `${baseURL}/v1/account/request-password-change/${email}`;

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
 * @author David Linhardt
 *
 * @async
 * @param {string} token (from URL)
 * @param {string} newPassword
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const changePassword = async (token: string, newPassword: string) => {
    const url = `${baseURL}/v1/account/change-password`;

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
 * @author David Linhardt
 *
 * @async
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const logout = async () => {
    const url = `${baseURL}/logout`;

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
 * @author David Linhardt
 *
 * @async
 * @param {string} email
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
 */
const resendInvite = async (email: string, isAdmin: boolean) => {
    const url = `${baseURL}/v1/admin/resend/invite`;

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
