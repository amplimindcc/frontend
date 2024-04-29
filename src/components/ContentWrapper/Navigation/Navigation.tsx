import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useEffect, useState } from 'react';
import user from '../../../services/user';
import toast from '../../../services/toast';
import { ToastType } from '../../../interfaces/ToastType';

export default function Navigation({ isAdmin }: { isAdmin: boolean }) {
    const [username, setUsername] = useState<string>('loading...');

    useEffect(() => {
        let hasBeenExecuted = false;
        const fetchData = async () => {
            try {
                const res = await user.authenticated();
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.email);
                } else {
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(res.status, 'Not authenticated')
                    );
                }
            } catch (e: any) {
                toast.showToast(ToastType.ERROR, e.message);
            }
        };
        if (!hasBeenExecuted) {
            fetchData();
        }
        return () => {
            hasBeenExecuted = true; // Cleanup
        };
    }, []);

    return (
        <div className="nav-bar">
            <div className="nav-links">
                {isAdmin && (
                    <>
                        <NavLink
                            className={({ isActive }) =>
                                ['nav-link', isActive ? 'active' : null]
                                    .filter(Boolean)
                                    .join(' ')
                            }
                            end // <-- prevents matching on sub-routes, similar to exact
                            to="/admin/user-management"
                        >
                            Users
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
                            Submissions
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
                            Exercises
                        </NavLink>
                    </>
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
                    {username}
                </NavLink>
            </div>
        </div>
    );
}
