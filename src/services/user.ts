/**
 * Login service : session is set as cookie
 * @async
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
 * @async
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
 * @async
 * @param {string} email
 * @param {boolean} isAdmin
 * @returns {Object}
 */
const add = async (email: string, isAdmin: boolean) => {
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

/**
 * Remove service : delete a user
 * @async
 * @param {string} email
 * @returns {Object}
 */
// delete cant be used as function name
const remove = async (email: string) => {
    const url = `http://localhost:8080/vi/admin/${email}`;

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
 * @returns {Object}
 */
const usermod = async (email: string, admin: boolean) => {
    const url = 'http://localhost:8080/v1/admin/change/role';

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

export default { login, list, add, remove, usermod };
