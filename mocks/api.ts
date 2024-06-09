import { http, HttpResponse } from 'msw';
import { StatusCodes } from 'http-status-codes';

const baseURL = import.meta.env.VITE_API_URL;

/**
 * Mock API Handlers
 * @author Steven Burger
 * @author David Linhardt
 * @author Matthias Roy
 * @author Timo Hauser
 *
 * @type {{HttpRequestHandler[]}}
 */
export const handlers = [
    http.post(`${baseURL}/v1/auth/login`, () => {
        return new HttpResponse(null, {
            status: StatusCodes.OK,
        });
    }),

    http.get(`${baseURL}/v1/auth/check-login`, () => {
        new HttpResponse(null, {
            status: StatusCodes.OK,
        });
        return HttpResponse.json({
            email: 'test@test.de',
        });
    }),

    http.get(`${baseURL}/v1/user/check-admin`, () => {
        new HttpResponse(null, {
            status: StatusCodes.OK,
        });
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

    http.post(`${baseURL}/v1/submission/submit`, () => {
        return new HttpResponse(null, {
            status: StatusCodes.OK,
        });
    }),

    http.get(`${baseURL}/v1/project/fetch`, () => {
        return HttpResponse.json({
            title: 'testTitle',
            description: 'testDescription',
        });
    }),

    http.get(`${baseURL}/v1/admin/fetch/users/all`, () => {
        new HttpResponse(null, {
            status: StatusCodes.OK,
        });
        return HttpResponse.json([
            {
                email: 'test@test.de',
                status: 'REGISTERED',
                isAdmin: false,
                canBeReinvited: true,
                inviteTokenExpiration: '01/01/2022 12:00',
            },
        ]);
    }),

    http.post(`${baseURL}/v1/admin/invite`, () => {
        return new HttpResponse(null, {
            status: StatusCodes.OK,
        });
    }),

    http.get(`${baseURL}/v1/admin/submission/all`, () => {
        new HttpResponse(null, {
            status: StatusCodes.OK,
        });
        return HttpResponse.json([
            {
                userEmail: "impl@web.de",
                expirationDate: "2024-06-08T08:05:18.340Z",
                projectID: 0,
                turnInDate: "2024-06-08T08:05:18.340Z",
                status: "IN_IMPLEMENTATION",
            },
            {
                userEmail: "submitted@web.de",
                expirationDate: "2024-06-08T08:05:18.340Z",
                projectID: 1,
                turnInDate: "2024-06-08T08:05:18.340Z",
                status: "SUBMITTED",
            },
            {
                userEmail: "init@web.de",
                expirationDate: "2024-06-08T08:05:18.340Z",
                projectID: 2,
                turnInDate: "2024-06-08T08:05:18.340Z",
                status: "INIT",
            },
        ])
    }),
];
