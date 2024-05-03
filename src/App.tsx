import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import UserAuthWrapper from './components/UserAuthWrapper/UserAuthWrapper';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Invite from './pages/Invite/Invite';
import ResetPasswordRequest from './pages/ResetPasswordRequest/ResetPasswordRequest';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Logout from './pages/Logout/Logout';
import ProjectStart from './pages/ProjectStart/ProjectStart';
import Commit from './pages/Commit/Commit';
import ProjectState from './pages/ProjectState/ProjectState';
import Users from './pages/Admin/components/Users/Users';
import Submissions from './pages/Admin/components/Submissions/Submissions';
import Challenges from './pages/Admin/components/Challenges/Challenges';
import ContentWrapper from './components/ContentWrapper/ContentWrapper';
import AdminAuthWrapper from './components/AdminAuthWrapper/AdminAuthWrapper';
import AuthenticatedContext, { useAuthenticatedContext } from './components/AuthenticatedContext';
import { useState } from 'react';

export default function App() {

    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    return (
        <AuthenticatedContext.Provider value={{ authenticated, setAuthenticated }}>
            <Router>
                <Routes>
                    <Route path="/login" element={
                        <ContentWrapper>
                            <Login />
                        </ContentWrapper>
                    }/>
                    <Route path="/admin" element={<AdminAuthWrapper/>}>
                        <Route path="" element={
                            <ContentWrapper>
                                <Admin />
                            </ContentWrapper>
                        } />
                        <Route path="user-management" element={
                            <ContentWrapper>
                                <Users />
                            </ContentWrapper>
                        } />
                        <Route path="submissions-management" element={
                            <ContentWrapper>
                                <Submissions />
                            </ContentWrapper>
                        } />
                        <Route path="exercises-management" element={
                            <ContentWrapper>
                                <Challenges />
                            </ContentWrapper>
                        } />
                    </Route>
                    <Route path="/invite">
                        <Route path="/invite">
                            <Route path=":token" element={
                                <ContentWrapper>
                                    <Invite />
                                </ContentWrapper>
                            }/>
                        </Route>
                    </Route>
                    <Route path="/project" element={<UserAuthWrapper />}>
                        <Route path="/project/start" element={
                            <ContentWrapper>
                                <ProjectStart />
                            </ContentWrapper>
                        }/>
                        <Route path="/project/commit" element={
                            <ContentWrapper>
                                <Commit />
                            </ContentWrapper>
                        }/>
                        <Route path="/project/status" element={
                            <ContentWrapper>
                                <ProjectState />
                            </ContentWrapper>
                        }/>
                    </Route>
                    <Route path="/resetPasswordRequest" element={
                        <ContentWrapper>
                            <ResetPasswordRequest />
                        </ContentWrapper>
                    }/>
                    <Route path="/reset-password">
                        <Route path=':token' element={
                            <ContentWrapper>
                                <ResetPassword />
                            </ContentWrapper>
                    }/>
                    </Route>
                    <Route path="/logout" element={
                        <ContentWrapper>
                            <Logout />
                        </ContentWrapper>
                    }/>
                </Routes>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </AuthenticatedContext.Provider>
    );
}
