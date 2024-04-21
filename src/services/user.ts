/**
 * Login service: session is set as cookie
 * Use inside try/catch
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

const authenticated = async () => {
    const url = 'http://localhost:8080/v1/auth/check-login';

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

    return res;
}

export default { login, authenticated };