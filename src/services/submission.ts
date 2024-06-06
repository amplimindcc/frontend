const baseURL = import.meta.env.VITE_API_URL;

/**
 * getStatus service: check if a submission is active
 * http://localhost:8080/swagger-ui/index.html#/submission-controller/fetchSubmissionActiveInfo
 * @author Steven Burger
 *
 * @async
 * @returns {Promise<Response>}
 * @throws {Error} connection error
 */
const getStatus = async () => {
    const url = `${baseURL}/v1/submission/active`;

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
 * @author Matthias Roy
 *
 * @async
 * @param {string} language
 * @param {string} version
 * @param {string} zipFileContent
 * @param {string} [optionalChat]
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
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
 * @author Timo Hauser
 *
 * @async
 * @returns {Promise<Response>} HTTP response
 * @throws {Error} connection error
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

/**
 * List service : update point for frontend, sends a heartbeat every 15 second
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/subscribeToSubmissionStatus
 * @async
 * @returns {Promise<Response>} HTTP response
 * @throws {any} connection error
 */
const heartbeat = async () => {
    const url = `${baseURL}/v1/admin/submission/status/subscribe`;

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
 * Change state service : set the submission state to reviewed, needs email as input
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/changeSubmissionStateReviewed
 * @author Timo Hauser
 *
 * @async
 * @returns {Promise<Response>} HTTP response
 * @throws {any} connection error
 */
const reviewSubmission = async (email: string) => {
    const url = `${baseURL}/v1/admin/change/submissionstate/reviewed/${email}`;

    const res = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return res;
};

/**
 * get the result page link for a submission
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/getUserLink
 * @author David Linhardt
 *
 * @async
 * @param {string} email
 * @returns {Promise<Response>}
 */
const getResultPageLink = async (email: string) => {
    const url = `${baseURL}/v1/admin/fetch/repo/url/${email}`;

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
    heartbeat,
    reviewSubmission,
    getResultPageLink,
};
