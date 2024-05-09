import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useEffect, useState } from 'react';
import user from '../../../services/user';
import toast from '../../../services/toast';
import { ToastType } from '../../../interfaces/ToastType';
import Loader from '../../Loader/Loader';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../LanguageSelector/LanguageSelector';

export default function Navigation() {
    const { t } = useTranslation('main');

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
                    toast.showToast(ToastType.ERROR, toast.httpError(res.status, t('notAuthenticated')));
                }
            } catch (e: any) {
                toast.showToast(ToastType.ERROR, t('connectionError'));
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
                    toast.showToast(ToastType.ERROR, toast.httpError(res.status, t('notAuthenticated')));
                }
            } catch (e: any) {
                toast.showToast(ToastType.ERROR, t('connectionError'));
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
                                {t('navBarUsers')}
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
                                {t('navBarSubmissions')}
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
                                {t('navBarExercises')}
                            </NavLink>
                        </>
                    )}

                    <LanguageSelector />

                    <NavLink
                        className={({ isActive }) =>
                            ['nav-link username', isActive ? 'active' : null]
                                .filter(Boolean)
                                .join(' ')
                        }
                        end // <-- prevents matching on sub-routes, similar to exact
                        to="/logout"
                    >
                        {username ? username : <Loader height={16} width={16} borderWidth={2} />}
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
