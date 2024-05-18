const baseURL = import.meta.env.VITE_API_URL;

/**
 * Fetches project for an authenticated user
 * @async
 * @returns {Response}
 */
const getSingleUserProject = async () => {
    const url = `${baseURL}/v1/project/fetch`;

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
    getSingleUserProject,
};
