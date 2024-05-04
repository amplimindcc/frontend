import { Outlet, Navigate } from "react-router-dom";
import { ToastType } from "../../interfaces/ToastType";
import toast from "../../services/toast";
import user from "../../services/user";
import { useEffect, useState } from "react";
import serviceHelper from "../../services/serviceHelper";
import LoaderPage from "../LoaderPage/LoaderPage";
import { useAuthenticatedContext } from "../AuthenticatedContext";
import { useAuthorizedContext } from "../AuthorizedContext";

const AdminAuthWrapper = () => {
    const { authenticated, setAuthenticated } = useAuthenticatedContext();
    const {authorized, setAuthorized} = useAuthorizedContext();

    if(authenticated === null) {
        return <LoaderPage />;
    };

    return authenticated && authorized ? <Outlet /> : <Navigate to="/login" />
}

export default AdminAuthWrapper;