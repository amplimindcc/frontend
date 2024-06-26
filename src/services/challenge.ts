const baseURL = import.meta.env.VITE_API_URL;

/**
 * List service : list all submissions
 * @author Timo Hauser
 *
 * @async
 * @returns {Promise<Response>}
 */
const list = async () => {
    const url = `${baseURL}/v1/admin/project/fetch/all`;

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
 * Add service : add a new submission
 * @author Timo Hauser
 *
 * @async
 * @param {string} title
 * @param {string} description
 * @param {boolean} active
 * @returns {Promise<Response>}
 */
const add = async (title: string, description: string, active: boolean) => {
    const url = `${baseURL}/v1/admin/project/add`;
    const submission = {
        title,
        description,
        active,
    };

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
    });

    return res;
};

/**
 * Change Title service : changes the title of a challenge
 * @author Timo Hauser
 *
 * @async
 * @param projectId
 * @param newTitle
 * @returns {Promise<Response>}
 */
const changeTitle = async (projectId: number, newTitle: string) => {
    const url = `${baseURL}/v1/admin/change/project/title`;

    const res = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: projectId, newTitle: newTitle }),
    });

    return res;
};

/**
 * Set Active service : sets the active status of a challenge
 * @author Timo Hauser
 *
 * @async
 * @param {number} projectId
 * @param {boolean} active
 * @returns {Promise<Response>}
 */
const setActive = async (projectId: number, active: boolean) => {
    const url = `${baseURL}/v1/admin/change/project/active`;

    const res = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: projectId, active: active }),
    });

    return res;
};

/**
 * Delete Challenge service : deletes the challenge
 * @async
 * @param projectId
 * @param newTitle
 * @returns {Promise<Response>}
 */
const remove = async (projectId: number) => {
    const url = `${baseURL}/v1/admin/project/${projectId}`;

    const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res;
};

export default { list, add, changeTitle, remove, setActive };
