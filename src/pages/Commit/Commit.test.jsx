import { render, screen, waitFor } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';

import AuthProvider from '../../components/AuthProvider/AuthProvider';
import LangProvider from '../../components/LangProvider/LangProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import Commit from './Commit';
import { ToastContainer } from 'react-toastify';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import { StatusCodes } from 'http-status-codes';

const baseURL = import.meta.env.VITE_API_URL;

function renderCommit() {
    Object.defineProperty(navigator, 'language', {
        value: 'en',
        configurable: true,
    });

    render(
        <>
            <AuthProvider>
                <LangProvider>
                    <Router>
                        <Commit />
                    </Router>
                    <ToastContainer />
                </LangProvider>
            </AuthProvider>
        </>
    );
}

describe('Commit', () => {
    test('renders commit page', async () => {
        renderCommit();

        await screen.findByTestId('commit-form');
    });

    test('renders programming language input', async () => {
        renderCommit();

        await screen.findByLabelText(/programming language\s*\*:/i);
    });

    test('renders version input', async () => {
        renderCommit();

        await screen.findByLabelText(/version\s*\*:/i);
    });

    test('renders textarea for optional message', async () => {
        renderCommit();

        await screen.findByTestId('optionalMessage');
    });

    test('renders file upload input', async () => {
        renderCommit();

        await screen.findByTestId('fileUpload');
    });

    test('button is rendered', async () => {
        renderCommit();

        await screen.findByRole('button', { name: /upload/i });
    });

    test('programming language input works', async () => {
        renderCommit();

        const programmingLanguageInput = await screen.findByLabelText(/programming language\s*\*:/i);
        await userEvent.type(programmingLanguageInput, 'test');
        expect(programmingLanguageInput).toHaveValue('test');
    });

    test('version input works', async () => {
        renderCommit();

        const versionInput = await screen.findByLabelText(/version\s*\*:/i);
        await userEvent.type(versionInput, 'test');
        expect(versionInput).toHaveValue('test');
    });

    test('optional message textarea input works', async () => {
        renderCommit();

        const optionalMessageInput = await screen.findByTestId('optionalMessage');
        await userEvent.type(optionalMessageInput, 'test');
        expect(optionalMessageInput).toHaveValue('test');
    });

    test('file upload input works', async () => {
        renderCommit();

        const fileUploadInput = await screen.findByTestId('fileUpload');
        const file = new File(['test content'], 'test.zip', { type: 'application/zip' });
        await userEvent.upload(fileUploadInput, file);

        expect(fileUploadInput.files[0]).toBe(file); // check if is same file
        expect(fileUploadInput.files[0].name).toBe('test.zip'); // check if it has the same name
        expect(fileUploadInput.files[0].type).toBe('application/zip'); // check if it's a real zip file
    });

    test('get project details', async () => {
        renderCommit();

        await screen.findByText(/testTitle/i);
        await screen.findByText(/testDescription/i);
    });

    test('error while fetch project details', async () => {
        server.use(
            http.get(`${baseURL}/v1/project/fetch`, () => {
                return new HttpResponse(null, {
                    status: StatusCodes.BAD_REQUEST,
                });
            })
        );

        renderCommit();

        await screen.findByText(/error while fetching project details/i);
    });

    test('submission expired on page loaded', async () => {
        server.use(
            http.get(`${baseURL}/v1/submission/active`, () => {
                return HttpResponse.json({
                    isExpired: true,
                    isStarted: true,
                });
            })
        );

        renderCommit();

        await screen.findByText(/the challenge has expired/i);
    });

    // following tests for submitting (test names begin with "submit:")
    test('submit: all inputs empty', async () => {
        renderCommit();

        const uploadButton = await screen.findByRole('button', { name: /upload/i });

        const user = userEvent.setup();
        await user.click(uploadButton);

        await screen.findByText(/Submission failed. Required fields are not filled:/i);
        await screen.findByText(/Language field is empty!/i);
        await screen.findByText(/Version field is empty!/i);
        await screen.findByText(/No file to upload selected!/i);
    });

    test('submit: only language input filled', async () => {
        renderCommit();

        const uploadButton = await screen.findByRole('button', { name: /upload/i });
        const languageInput = await screen.findByLabelText(/programming language\s*\*:/i);

        const user = userEvent.setup();
        await user.type(languageInput, 'testLanguage');
        await user.click(uploadButton);

        await screen.findByText(/Submission failed. Required fields are not filled:/i);
        await screen.findByText(/Version field is empty!/i);
        await screen.findByText(/No file to upload selected!/i);

        await waitFor(() => {
            expect(() => screen.findByText(/Language field is empty!/i).toThrow());
        })
    });

    test('submit: only version input filled', async () => {
        renderCommit();

        const uploadButton = await screen.findByRole('button', { name: /upload/i });
        const versionInput = await screen.findByLabelText(/version\s*\*:/i);

        const user = userEvent.setup();
        await user.type(versionInput, 'testVersion');
        await user.click(uploadButton);

        await screen.findByText(/Submission failed. Required fields are not filled:/i);
        await screen.findByText(/Language field is empty!/i);
        await screen.findByText(/No file to upload selected!/i);

        await waitFor(() => {
            expect(() => screen.findByText(/Version field is empty!/i).toThrow());
        })
    });

    test('submit: only fileUpload input filled', async () => {
        renderCommit();

        const uploadButton = await screen.findByRole('button', { name: /upload/i });
        const fileUploadInput = await screen.findByTestId('fileUpload');

        const user = userEvent.setup();
        await user.upload(fileUploadInput, new File(['test file'], 'test.zip', { type: 'application/zip' }));
        await user.click(uploadButton);

        await screen.findByText(/Submission failed. Required fields are not filled:/i);
        await screen.findByText(/Language field is empty!/i);
        await screen.findByText(/Version field is empty!/i);

        await waitFor(() => {
            expect(() => screen.findByText(/No file to upload selected!/i).toThrow());
        })
    });

    test('submit: upload successful', async () => {
        renderCommit();

        const languageInput = await screen.findByLabelText(/programming language\s*\*:/i);
        const versionInput = await screen.findByLabelText(/version\s*\*:/i);
        const fileUploadInput = await screen.findByTestId('fileUpload');
        const uploadButton = await screen.findByRole('button', { name: /upload/i });
        const user = userEvent.setup();

        await user.type(languageInput, 'testLanguage');
        await user.type(versionInput, 'testVersion');
        await user.upload(fileUploadInput, new File(['test file'], 'test.zip', { type: 'application/zip' }));
        await user.click(uploadButton);

        await screen.findByText(/submission successful./i);
    });

    test('submit: submission expired', async () => {
        server.use(
            http.post(`${baseURL}/v1/submission/submit`, () => {
                return new HttpResponse(null, {
                    status: StatusCodes.CONFLICT,
                })
            })
        );

        renderCommit();

        const languageInput = await screen.findByLabelText(/programming language\s*\*:/i);
        const versionInput = await screen.findByLabelText(/version\s*\*:/i);
        const fileUploadInput = await screen.findByTestId('fileUpload');
        const uploadButton = await screen.findByRole('button', { name: /upload/i });
        const user = userEvent.setup();

        await user.type(languageInput, 'testLanguage');
        await user.type(versionInput, 'testVersion');
        await user.upload(fileUploadInput, new File(['test file'], 'test.zip', { type: 'application/zip' }));
        await user.click(uploadButton);

        await screen.findByText(/submission expired./i);
    });

    test('submit: submission failed', async () => {
        server.use(
            http.post(`${baseURL}/v1/submission/submit`, () => {
                return new HttpResponse(null, {
                    status: StatusCodes.BAD_REQUEST,
                })
            })
        );

        renderCommit();

        const languageInput = await screen.findByLabelText(/programming language\s*\*:/i);
        const versionInput = await screen.findByLabelText(/version\s*\*:/i);
        const fileUploadInput = await screen.findByTestId('fileUpload');
        const uploadButton = await screen.findByRole('button', { name: /upload/i });
        const user = userEvent.setup();

        await user.type(languageInput, 'testLanguage');
        await user.type(versionInput, 'testVersion');
        await user.upload(fileUploadInput, new File(['test file'], 'test.zip', { type: 'application/zip' }));
        await user.click(uploadButton);

        await screen.findByText(/submission failed./i);
    });

    test('submit: connection error', async () => {
        server.use(
            http.post(`${baseURL}/v1/submission/submit`, () => {
                return HttpResponse.error();
            })
        );

        renderCommit();

        const languageInput = await screen.findByLabelText(/programming language\s*\*:/i);
        const versionInput = await screen.findByLabelText(/version\s*\*:/i);
        const fileUploadInput = await screen.findByTestId('fileUpload');
        const uploadButton = await screen.findByRole('button', { name: /upload/i });
        const user = userEvent.setup();

        await user.type(languageInput, 'testLanguage');
        await user.type(versionInput, 'testVersion');
        await user.upload(fileUploadInput, new File(['test file'], 'test.zip', { type: 'application/zip' }));
        await user.click(uploadButton);

        await screen.findByText(/connection error./i);
    });
});