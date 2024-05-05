import React, { useEffect, useState, ReactNode } from 'react';
import AuthenticatedContext from './AuthenticatedContext';
import user from '../services/user';
import toast from '../services/toast';
import { ToastType } from '../interfaces/ToastType';
import { getReasonPhrase } from 'http-status-codes';
import AuthorizedContext from './AuthorizedContext';

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchAuthentication = async () => {
            try {
                const res = await user.authenticated();
                if(res.ok) {
                    setAuthenticated(res.ok);
                }
                else {
                    setAuthenticated(res.ok);
                }
            } catch (error: any) {
                toast.showToast(ToastType.ERROR, 'Failed to fetch authentication status:', error);
                setAuthenticated(false);
            }
        };
        fetchAuthentication();
    }, []);

    useEffect(() => {
        if(!authenticated) return; //  guard clause
        const fetchAuthorization = async () => {
            try {
                const res = await user.checkAdmin();
                if(res.ok) {
                    const currentUser = await res.json();
                    setAuthorized(currentUser.isAdmin);
                }
                else {
                    setAuthorized(false);
                    toast.showToast(ToastType.ERROR, toast.httpError(res.status, getReasonPhrase(res.status)));
                }
            }
            catch (error: any){
                setAuthorized(false);
                toast.showToast(ToastType.ERROR, 'Failed to fetch authorization status:', error);
            }
        };
        fetchAuthorization();
    }, [authenticated]);

    useEffect(() => {
        console.log(`Authenticated: ${authenticated}
        Authorized: ${authorized}`);
    }, [authenticated, authorized]);

    return (
        <AuthenticatedContext.Provider value={{ authenticated, setAuthenticated }}>
            <AuthorizedContext.Provider value={{ authorized, setAuthorized }}>
                {children}
            </AuthorizedContext.Provider>
        </AuthenticatedContext.Provider>
    );
};

export default AuthProvider;
