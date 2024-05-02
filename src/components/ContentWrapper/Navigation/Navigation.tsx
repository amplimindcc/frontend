import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useEffect, useState } from 'react';
import user from '../../../services/user';
import toast from '../../../services/toast';
import { ToastType } from '../../../interfaces/ToastType';
import Loader from '../../Loader/Loader';
import logo_break from '../../../assets/logo_break.png';

export default function Navigation() {
    const [username, setUsername] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        let hasBeenExecuted = false;
        const fetchUser = async () => {
            try {
                const res = await user.authenticated();
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.email);
                }
                else {
                    toast.showToast(ToastType.ERROR, toast.httpError(res.status, 'Not authenticated'));
                }
            } catch (e: any) {
                toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
            }
        };



        const fetchAdmin = async () => {
            try {
                const res = await user.checkAdmin();
                if (res.ok) {
                    const currentUser = await res.json();
                    setIsAdmin(currentUser.isAdmin);
                }
                else {
                    toast.showToast(ToastType.ERROR, toast.httpError(res.status, 'Not authenticated'));
                }
            } catch (e: any) {
                toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
            }
        };

        if (!hasBeenExecuted) {
            fetchUser();
            fetchAdmin();
        }
        return () => {
            hasBeenExecuted = true; // Cleanup
        };
    }, []);

    return (
        <div className="nav-bar">
            <div className="nav-bar-content">
                <div className="logo">
                    <img src={logo_break} alt="logo" className='logo' />
                </div>
                <div className="nav-links">
                    {isAdmin && (
                        <div className="nav">
                            <NavLink
                                className={({ isActive }) =>
                                    ['nav-link', isActive ? 'active' : null]
                                        .filter(Boolean)
                                        .join(' ')
                                }
                                end // <-- prevents matching on sub-routes, similar to exact
                                to="/admin/user-management"
                            >
                                <div className='link-container'>
                                    <span className='arrow'>{'>'}</span>Users
                                </div>
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    ['nav-link', isActive ? 'active' : null]
                                        .filter(Boolean)
                                        .join(' ')
                                }
                                end // <-- prevents matching on sub-routes, similar to exact
                                to="/admin/submissions-management"
                            >
                                <div className='link-container'>
                                    <span className='arrow'>{'>'}</span>  Submissions
                                </div>
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    ['nav-link', isActive ? 'active' : null]
                                        .filter(Boolean)
                                        .join(' ')
                                }
                                end // <-- prevents matching on sub-routes, similar to exact
                                to="/admin/exercises-management"
                            >
                                <div className='link-container'>
                                    <span className='arrow'>{'>'}</span>  Exercises
                                </div>
                            </NavLink>
                        </div>
                    )}
                    <NavLink
                        className={({ isActive }) =>
                            ['nav-link username', isActive ? 'active' : null]
                                .filter(Boolean)
                                .join(' ')
                        }
                        end // <-- prevents matching on sub-routes, similar to exact
                        to="/logout"
                    >
                        <div className='link-container'>
                            {username ? username : <Loader height={16} width={16} borderWidth={2} />}
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
