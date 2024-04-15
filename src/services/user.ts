/**
 * Login service : session is set as cookie
 * @param {string} username
 * @param {string} password 
 * @returns {Object}
 */
const login = async (username: string, password: string) => {
    const url = 'http://localhost:8080/v1/auth/login';
    const user = {
        username,
        password
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return res;
}

export default { login };