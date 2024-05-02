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

export default {
    getStatus
}