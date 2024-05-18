const baseURL = import.meta.env.VITE_API_URL;

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
        },
    });

    return res;
};

/**
 * Add service : add a new user
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/createInvite
 * @async
 * @param {string} language
 * @param {string} version
 * @param {string} zipFileContent
 * @param {string} [optionalChat]
 * @returns {Response} HTTP response
 * @throws {any} connection error
 */
const sendSubmission = async (
    language: string,
    version: string,
    zipFileContent: File | null,
    optionalChat?: string
): Promise<Response> => {
    const url = `${baseURL}/v1/submission/submit`;

    if (zipFileContent == null) throw new Error('File is null!');

    const description = optionalChat === undefined ? '' : optionalChat;

    const formData = new FormData();
    formData.append('description', description);
    formData.append('language', language);
    formData.append('version', version);
    formData.append('zipFileContent', zipFileContent);

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    });

    return res;
};

/**
 * List service : list all submissions
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/fetchAllSubmissions
 * @async
 * @returns {Response} HTTP response
 * @throws {any} connection error
 */
const list = async () => {
    const url = `${baseURL}/v1/admin/submission/all`;

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
    sendSubmission,
};
