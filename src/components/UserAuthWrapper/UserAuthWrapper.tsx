import { Outlet, Navigate } from "react-router-dom";
import { ToastType } from "../../interfaces/ToastType";
import toast from "../../services/toast";
import user from "../../services/user";
import { useEffect, useState } from "react";
import serviceHelper from "../../services/serviceHelper";
import LoaderPage from "../LoaderPage/LoaderPage";
import { useAuthenticatedContext } from "../AuthenticatedContext";
import { useAuthorizedContext } from "../AuthorizedContext";

const UserAuthWrapper = () => {
    const { authenticated, setAuthenticated } = useAuthenticatedContext();
    const {authorized, setAuthorized} = useAuthorizedContext();

    if(authenticated === null) {
        return <LoaderPage />;
    };

    return authenticated ?
                authorized ? <Navigate to="/admin" /> : <Outlet />
            : <Navigate to="/login" />;
}

export default UserAuthWrapper;