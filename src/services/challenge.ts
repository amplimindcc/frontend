const baseURL = 'http://localhost:8080/v1';
const baseBaseURL = 'http://localhost:8080';

/**
 * List service : list all submissions
 * @async
 * @returns {Promise}
 */
const list = async () => {
    const url = `${baseURL}/admin/project/fetch/all`;

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
 * @async
 * @param {string} title
 * @param {string} description
 * @param {boolean} active
 * @returns {Promise}
 */
const add = async (title: string, description: string, active: boolean) => {
    const url = `${baseURL}/admin/project/add`;
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
 * @async
 * @param projectId
 * @param newTitle
 * @returns {Promise}
 */
const changeTitle = async (projectId: number, newTitle: string) => {
    const url = `${baseURL}/admin/change/project/title`;

    const res = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: projectId, newTitle: newTitle}),
    });

    return res;
};

const setActive = async (projectId: number, active: boolean) => {
    const url = `${baseURL}/admin/change/project/active`;

    const res = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: projectId, active: active}),
    });

    return res;
};

/**
 * Delete Challenge service : deletes the challenge
 * @async
 * @param projectId
 * @param newTitle
 * @returns {Promise}
 */
const remove = async (projectId : number) => {
    const url = `${baseURL}/admin/project/${projectId }`;

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