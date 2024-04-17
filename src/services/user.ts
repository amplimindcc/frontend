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
        password
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
}

export default { login };