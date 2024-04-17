import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
    return (
        <div className="nav-links">
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
        </div>
    );
}
