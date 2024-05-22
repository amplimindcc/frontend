import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';

const baseURL = import.meta.env.VITE_API_URL;

export const handlers = [
    http.post(`${baseURL}/v1/auth/login`, () => {
        return new HttpResponse(null, {
            status: StatusCodes.OK,
        });
    }),

    http.get(`${baseURL}/v1/auth/check-login`, () => {
        return new HttpResponse(null, {
            status: StatusCodes.OK,
        });
    }),

    http.get(`${baseURL}/v1/user/check-admin`, () => {
        return HttpResponse.json({
            user: {
                isAdmin: true,
            },
        });
    }),

    http.post(`${baseURL}/logout`, () => {
        return new HttpResponse(null, {
            status: StatusCodes.FORBIDDEN,
        });
    }),

    http.post(
        `${baseURL}/v1/account/request-password-change/user@web.de`,
        () => {
            return new HttpResponse(null, {
                status: StatusCodes.OK,
            });
        }
    ),

    http.post(`${baseURL}/v1/account/change-password`, () => {
        return new HttpResponse(null, {
            status: StatusCodes.OK,
        });
    }),

    http.post(`${baseURL}/v1/auth/register`, () => {
        return new HttpResponse(null, {
            status: StatusCodes.OK,
        });
    }),

    http.get(`${baseURL}/v1/submission/active`, () => {
        return HttpResponse.json({
            isExpired: false,
            isStarted: false,
        });
    }),

    http.get(`${baseURL}/v1/project/fetch`, () => {
        return HttpResponse.json({});
    }),
];
