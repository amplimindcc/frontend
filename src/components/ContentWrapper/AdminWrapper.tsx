import Navigation from './Navigation/Navigation';
import Layout from '../Layout/Layout';
import Footer from './Footer/Footer';
import { useEffect, useState } from 'react';
import user from '../../services/user';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import LoaderPage from '../LoaderPage/LoaderPage';
import Unauthorized from '../../pages/Unauthorized/Unauthorized';
import { getReasonPhrase } from 'http-status-codes';

export default function ContentWrapper({ children }: any) {
    const [authenticated, setAuthenticated] = useState<Boolean | null>(null);
    const [authorized, setAuthorized] = useState<Boolean | null>(null);

    useEffect(() => {
        // only display navigation if user is authenticated
        const checkLogin = async () => {
            try {
                const res = await user.authenticated();
                setAuthenticated(res.ok);
            }
            catch(e: any) {
                toast.showToast(ToastType.ERROR, 'Connection error while checking authentication.');
                setAuthenticated(false);
            }
        };
        const checkAdmin = async () => {
            try {
                const res = await user.checkAdmin();
                if(res.ok) {
                    const data = await res.json();
                    setAuthorized(data.isAdmin);
                }
                else {
                    toast.showToast(ToastType.ERROR, toast.httpError(res.status, getReasonPhrase(res.status)));
                }
            }
            catch(e: any) {
                toast.showToast(ToastType.ERROR, 'Connection error while checking authorization.');
                setAuthorized(false);
            }
        };
        checkLogin();
        checkAdmin();
    }, []);

    if(authenticated === null || authorized === null) {
        return <LoaderPage />;
    }

    return (
        <>
            { authenticated && authorized && <Navigation/> }
            { authenticated && authorized &&
                (authenticated && authorized) ? (
                    <Layout>
                        {children}
                    </Layout>
                ) : (
                    <Unauthorized />
                )
            }
            { authenticated && authorized && <Footer/> }
        </>
    );
}
