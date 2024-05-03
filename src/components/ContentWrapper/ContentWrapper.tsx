import Navigation from './Navigation/Navigation';
import Layout from '../Layout/Layout';
import Footer from './Footer/Footer';
import React, { useEffect } from 'react';
import user from '../../services/user';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useAuthenticatedContext } from '../AuthenticatedContext';

export default function ContentWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { authenticated, setAuthenticated } = useAuthenticatedContext();

    useEffect(() => {
        console.log('Authenticated state has updated to:', authenticated);
    }, [authenticated]); // This effect will run whenever 'authenticated' changes.

    setAuthenticated?.(true); // This will update the 'authenticated' state.

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await user.authenticated();
                setAuthenticated?.(res.ok);
            } catch (err) {
                toast.showToast(
                    ToastType.ERROR,
                    'Connection error. Try again later.'
                );
                setAuthenticated?.(false);
            }
        };
        if (authenticated === null) {
            checkLogin();
        }
    }, []);

    if (authenticated === null) {
        return <LoaderPage />;
    }

    return (
        <>
            {authenticated && <Navigation />}
            <Layout>{children}</Layout>
            <Footer />
        </>
    );
}
