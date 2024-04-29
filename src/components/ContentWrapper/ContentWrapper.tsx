import Navigation from './Navigation/Navigation';
import Layout from '../Layout/Layout';
import toast from '../../services/toast';
import { ToastType } from '../../interfaces/ToastType';
import { useState, useEffect } from 'react';
import user from '../../services/user';
import Footer from './Footer/Footer';

export default function ContentWrapper({ children }: any) {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    interface User {
        isAdmin: boolean;
    }
    useEffect(() => {
        let hasBeenExecuted = false;
        const fetchData = async () => {
            try {
                const res = await user.checkAdmin();
                if (res.ok) {
                    const currentUser: User = await res.json();
                    setLoading(false);
                    setIsAdmin(currentUser.isAdmin);
                } else {
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(res.status, res.statusText)
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
        <>
            {loading ? (
                <div>checking for user...</div>
            ) : (
                <>
                    <Navigation isAdmin={isAdmin}/>
                        <Layout>
                            {children}
                        </Layout>
                    <Footer/>
                </>
            )}
        </>
    );
}
