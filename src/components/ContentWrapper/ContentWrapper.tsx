import Navigation from './Navigation/Navigation';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import { useState, useEffect } from 'react';
import user from '../../services/user';
import Footer from './Footer/Footer';
import Unauthorized from '../../pages/Unauthorized/Unauthorized';

export default function Layout({ children }: any) {

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    interface User {
        isAdmin: boolean;
    };
    useEffect(() => {
        let hasBeenExecuted  = false;
        const fetchData = async () => {
            try {
                const res = await user.checkAdmin();
                if(res.ok) {
                    const currentUser: User = await res.json();
                    setLoading(false);
                    setIsAdmin(currentUser.isAdmin);
                    if(currentUser.isAdmin) {
                    }
                    else {
                        toast.showToast(ToastType.ERROR, 'You are not authorized to view this page');
                    }
                }
                else {
                    toast.showToast(ToastType.ERROR, toast.httpError(res.status, res.statusText));
                }
            }
            catch (e: any) {
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
        <>
            {loading ? (
                <div>checking for admin status...</div>
            ) : (
                isAdmin ? (
                    <div className="layout">
                        <Navigation />
                        <div className="content">{children}</div>
                        <Footer />
                    </div>
                ) : (
                    <Unauthorized />
                )
            )
            }
        </>
    );
}
