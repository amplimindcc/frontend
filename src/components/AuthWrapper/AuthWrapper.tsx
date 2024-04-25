import { useEffect, useState } from "react";
import user from "../../services/user";
import { ToastType } from "../../interfaces/ToastType";
import toast from "../../services/toast";
import Loader from "../Loader/Loader";
import React from "react";

const AuthWrapper = ({ children }: any) => {
    const [authenticated, setAuthenticated] = useState<Boolean | null>(null);

    useEffect(() => {
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

    return (
        <>
            {
                authenticated === null ? (
                    <Loader height={32} width={32} borderWidth={5}/>
                ) : (
                    React.cloneElement(children, { authenticated })
                )
            }
        </>
    );
}

export default AuthWrapper;