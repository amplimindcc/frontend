const baseURL = 'http://localhost:8080/v1';

/**
 *
 * @returns {Response}
 */
const getStatus = async () => {
    const url = `${baseURL}/submission/active`;

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return res;
}

/**
 * List service : list all submissions
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/fetchAllSubmissions
 * @async
 * @returns {Response} HTTP response
 * @throws {any} connection error
 */
const list = async () => {
    const url = `${baseURL}/admin/submission/all`;

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res;
};

export default {
    getStatus,
    list,
}