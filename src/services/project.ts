const baseURL = 'http://localhost:8080/v1';

/**
 * Fetches project for an authenticated user
 * @async
 * @returns {Response}
 */
const getSingleUserProject = async () => {
    const url = `${baseURL}/project/fetch`;

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res;
}

export default {
    getSingleUserProject
}