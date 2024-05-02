const baseURL = 'http://localhost:8080/v1';

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