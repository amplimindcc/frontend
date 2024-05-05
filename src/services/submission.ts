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
 * Add service : add a new user
 * http://localhost:8080/swagger-ui/index.html#/admin-controller/createInvite
 * @async
 * @param {string} language
 * @param {string} version
 * @param {string} filePath
 * @param {string} [optionalChat]
 * @returns {Response} HTTP response
 * @throws {any} connection error
 */
const sendSubmission = async (language: string, version: string, filePath: string, optionalChat?: string,): Promise<Response> => {
    const url = `${baseURL}/submission/submit`;

    const description = optionalChat === undefined ? "" : optionalChat;

    const submission = {
        description,
        language,
        version,
        filePath
    }

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
    });

    return res;
}

export default {
    getStatus,
    sendSubmission
}