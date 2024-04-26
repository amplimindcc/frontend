import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import AuthWrapper from './components/AuthWrapper/AuthWrapper';
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

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element=
                        {
                            <AuthWrapper>
                                <Login authenticated={null} />
                            </AuthWrapper>
                        }
                    />
                    <Route path="/admin">
                        <Route path="" element={<Admin />} />
                        <Route path="user-management" element={<Users />} />
                        <Route path="submissions-management" element={<Submissions />} />
                        <Route path="exercises-management" element={<Challenges />} />
                    </Route>
                    <Route path="/invite">
                        <Route path=":token" element=
                            {
                                <AuthWrapper>
                                    <Invite authenticated={null} />
                                </AuthWrapper>
                            }
                        />
                    </Route>
                    <Route path="/project/start" element=
                        {
                            <AuthWrapper>
                                <ProjectStart authenticated={null} />
                            </AuthWrapper>
                        }
                    />
                    <Route path="/project/commit" element=
                        {
                            <AuthWrapper>
                                <Commit authenticated={null} />
                            </AuthWrapper>
                        }
                    />
                    <Route path="/project/status" element=
                        {
                            <AuthWrapper>
                                <ProjectState authenticated={null} />
                            </AuthWrapper>
                        }
                    />
                    <Route path="/username" element={<Username />} />
                    <Route path="/resetPasswordRequest" element={<ResetPasswordRequest />} />
                    <Route path="/reset-password">
                        <Route path=':token' element={<ResetPassword />} />
                    </Route>
                    <Route path="/logout" element={<Logout />} />
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
