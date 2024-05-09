import { Outlet, Navigate } from "react-router-dom";
import { ToastType } from "../../interfaces/ToastType";
import toast from "../../services/toast";
import user from "../../services/user";
import { useEffect, useState } from "react";
import serviceHelper from "../../services/serviceHelper";
import LoaderPage from "../LoaderPage/LoaderPage";
import { useTranslation } from "react-i18next";

const UserAuthWrapper = () => {
    const { t } = useTranslation('main');

    const [authenticated, setAuthenticated] = useState<Boolean | null>(null);
    const [isAdmin, setIsAdmin] = useState<Boolean | null>(null);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await user.authenticated();

                if(res.ok) {
                    const isAdmin = await serviceHelper.checkAdmin();
                    setIsAdmin(isAdmin);
                }
                else {
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(res.status, t('notAuthenticated'))
                    );
                }
                setAuthenticated(res.ok);
            }
            catch(err) {
                toast.showToast(
                    ToastType.ERROR,
                    t('connectionError')
                );
                setAuthenticated(false);
            }
        };
        checkLogin();
    }, []);

    if(authenticated === null) {
        return <LoaderPage />;
    };

    return authenticated ?
                isAdmin ? <Navigate to="/admin" /> : <Outlet />
            : <Navigate to="/login" />;
}

export default UserAuthWrapper;