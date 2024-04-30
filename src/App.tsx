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
import Username from './pages/Username/Username';
import Challenges from './pages/Admin/components/Challenges/Challenges';
import ContentWrapper from './components/ContentWrapper/ContentWrapper';
import AdminWrapper from './components/ContentWrapper/AdminWrapper';

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={
                        <ContentWrapper>
                            <Login />
                        </ContentWrapper>
                    }/>
                    <Route path="/admin">
                        <Route path="" element={
                            <AdminWrapper>
                                <Admin />
                            </AdminWrapper>
                        } />
                        <Route path="user-management" element={
                            <AdminWrapper>
                                <Users />
                            </AdminWrapper>
                        } />
                        <Route path="submissions-management" element={
                            <AdminWrapper>
                                <Submissions />
                            </AdminWrapper>
                        } />
                        <Route path="exercises-management" element={
                            <AdminWrapper>
                                <Challenges />
                            </AdminWrapper>
                        } />
                    </Route>
                    <Route path="/invite" element={<UserAuthWrapper />}>
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
                    <Route path="/username" element={<Username />} />
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
        </>
    );
}
