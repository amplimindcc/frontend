import { http, HttpResponse } from 'msw'

const baseURL = 'http://localhost:8080';

export const handlers = [
    http.post(`${baseURL}/v1/auth/login`, () => {
        return new HttpResponse(null, {
            status: 200
        })
    }),

    http.get(`${baseURL}/v1/auth/check-login`, () => {
        return new HttpResponse(null, {
            status: 200
        })
    }),

    http.get(`${baseURL}/v1/user/check-admin`, () => {
        return HttpResponse.json({
            user: {
              isAdmin: true
            },
        })
    }),

    http.post(`${baseURL}/logout`, () => {
        return new HttpResponse(null, {
            status: 403
        })
    }),

    http.post(`${baseURL}/v1/account/request-password-change/user@web.de`, () => {
        return new HttpResponse(null, {
            status: 200
        })
    }),

    http.post(`${baseURL}/v1/account/change-password`, () => {
        return new HttpResponse(null, {
            status: 200
        })
    }),
]