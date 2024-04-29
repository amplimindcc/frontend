import Navigation from './Navigation/Navigation';
import Layout from '../Layout/Layout';
import Footer from './Footer/Footer';
import { useEffect, useState } from 'react';
import user from '../../services/user';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import LoaderPage from '../LoaderPage/LoaderPage';

export default function ContentWrapper({ children }: any) {
    const [authenticated, setAuthenticated] = useState<Boolean | null>(null);

    useEffect(() => {
        // only display navigation if user is authenticated
        const checkLogin = async () => {
            try {
                const res = await user.authenticated();
                setAuthenticated(res.ok);
            }
            catch(err) {
                toast.showToast(ToastType.ERROR, 'Connection error. Try again later.');
                setAuthenticated(false);
            }
        };
        checkLogin();
    }, []);

    if(authenticated === null) {
        return <LoaderPage />;
    }

    return (
        <>
            { authenticated && <Navigation/> }
            <Layout>
                {children}
            </Layout>
            <Footer/>
        </>
    );
}
