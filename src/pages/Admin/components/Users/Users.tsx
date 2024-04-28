import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import React, { useEffect, useState, useRef, LegacyRef } from 'react';
import { ColDef, GridOptions } from 'ag-grid-community';
import UsersTableElement from '../../../../interfaces/UsersTableElement';
import { Action } from '../../../../interfaces/Action';
import { ToastType } from '../../../../interfaces/ToastType';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ConfirmationModalData from '../../../../interfaces/ConfirmationModalData';
import Layout from '../Wrapper/Wrapper';
import user from '../../../../services/user';
import toast from '../../../../services/toast';
import './Users.css';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

export default function Users() {
    // Create a gridRef (for GridAPI)
    const gridRef: LegacyRef<AgGridReact> = useRef<AgGridReact>(null);

    // Add-User-Form States
    const [newUserAdmin, setNewUserAdmin] = useState<boolean>(false);
    const [newUserEmail, setNewUserEmail] = useState<string>('');

    // Confirmation-Modal States
    const [isConfirmationModalOpen, setConfirmationModalOpen] =
        useState<boolean>(false);
    const [confirmationModalData, setConfirmationModalData] =
        useState<ConfirmationModalData>({
            action: Action.DELETE,
            email: '',
            admin: false,
        });

    // Grid Options (Pagination)
    const gridOptions: GridOptions = {
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 25, 50, 100],
    };

    // Row Data
    const [rowData, setRowData] = useState<UsersTableElement[]>([]);
    useEffect(() => {
        let hasBeenExecuted  = false;
        const fetchData = async () => {
            try {
                const res = await user.list();
                if(res.ok) {
                    const data = await res.json();
                    setRowData(parseJson(data));
                }
                else {
                    const data = await res.json();
                    toast.showToast(ToastType.ERROR, toast.httpError(res.status, data.error));
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

    function parseJson(jsonArray: any[]): UsersTableElement[] {
        return jsonArray.map(item => ({
            email: item.email,
            status: item.status,
            admin: item.isAdmin,
            canBeReinvited: item.canBeReinvited,
            inviteTokenExpiration: item.inviteTokenExpiration,
        }));
    }

    // Cell Renderers (Custom Component Renderers)
    const deleteButtonRenderer = (params: any) => (
        <>
            <button
                onClick={() =>
                    askForConfirmation(params.data.email, Action.DELETE)
                }
            >
                {params.label}
            </button>
        </>
    );
    const reinviteButtonRenderer = (params: any) => (
        !params.data.canBeReinvited ? (
            <>
                <button
                    onClick={() =>
                        askForConfirmation(params.data.email, Action.REINVITE)
                    }
                >
                    {params.label}
                </button>
            </>
        ) : (<></>)
    );

    // Column Definitions
    const [colDefs, setColDefs] = useState<ColDef<UsersTableElement>[]>([
        {
            headerName: 'Email',
            field: 'email',
            cellDataType: 'text',
            filter: true,
            filterParams: {
                filterOptions: [
                    'contains',
                    'notContains',
                    'startsWith',
                    'endsWith',
                ],
            },
            sortable: true,
            sort: 'asc', // sort alphabetically
            editable: false,
        },
        {
            headerName: 'Status',
            field: 'status',
            cellDataType: 'text',
            filter: true,
            sortable: true,
            editable: false,
        },
        {
            headerName: 'Admin',
            field: 'admin',
            cellDataType: 'boolean',
            filter: true,
            sortable: true,
            editable: false,
            cellRendererParams: { disabled: true }, // set checkbox to read-only
        },
        {
            headerName: 'Invite Token Expiration',
            field: 'inviteTokenExpiration',
            cellDataType: 'string',
            filter: true,
            sortable: true,
            editable: false,
        },
        {
            headerName: 'Reinvite',
            filter: false,
            sortable: false,
            cellRenderer: reinviteButtonRenderer,
            cellRendererParams: { label: 'Reinvite' },
        },
        {
            headerName: 'Delete',
            filter: false,
            sortable: false,
            cellRenderer: deleteButtonRenderer,
            cellRendererParams: { label: 'Delete' },
        },
    ]);

    // Functions
    const deleteUser = async (email: string) => {
        try {
            const res: Response = await user.remove(email);
            if (res.ok) {
                setRowData(prevRowData => prevRowData.filter(user => user.email !== email));
            }
            else {
                const data = await res.json();
                toast.showToast(ToastType.ERROR, toast.httpError(res.status, data.error));
            }
        }
        catch (e: any) {
            toast.showToast(ToastType.ERROR, e.message);
        }
    };
    const addUser = async (email: string, admin: boolean) => {
        try {
            const res: Response = await user.add(email, admin);
            if (res.ok) {
                interface UserInBackend {
                    email: string;
                    status: string;
                    isAdmin: boolean;
                    canBeReinvited: boolean;
                    inviteTokenExpiration: string;
                }
                const updatedRowData = rowData;
                const json: UserInBackend = await res.json();
                const user: UsersTableElement = { email: json.email, status: json.status, admin: json.isAdmin, canBeReinvited: json.canBeReinvited, inviteTokenExpiration: json.inviteTokenExpiration };
                updatedRowData.push(user);
                setRowData(updatedRowData);
                const transaction = {
                    add: [user],
                };
                gridRef.current?.api.applyTransactionAsync(transaction);
            }
            else {
                const data = await res.json();
                toast.showToast(ToastType.ERROR, toast.httpError(res.status, data.error));
            }
        }
        catch (e: any) {
            toast.showToast(ToastType.ERROR, e.message);
        }
    };
    const reinviteUser = async (email: string, admin: boolean) => {
        try {
            const res: Response = await user.resendInvite(email, admin);
            if (res.ok) {
                interface UserInBackend {
                    email: string;
                    status: string;
                    isAdmin: boolean;
                    canBeReinvited: boolean;
                    inviteTokenExpiration: string;
                }
                const updatedRowData = rowData;
                const json: UserInBackend = await res.json();
                const user: UsersTableElement = { email: json.email, status: json.status, admin: json.isAdmin, canBeReinvited: json.canBeReinvited, inviteTokenExpiration: json.inviteTokenExpiration };
                updatedRowData.push(user);
                setRowData(updatedRowData);
            }
            else {
                const data = await res.json();
                toast.showToast(ToastType.ERROR, toast.httpError(res.status, data.error));
            }
        }
        catch (e: any) {
            toast.showToast(ToastType.ERROR, e.message);
        }
    };
    const askForConfirmation = (email: string, action: Action, admin: boolean = false) => {
        handleOpenConfirmationModal({
            email: email,
            action: action,
            admin: admin,
        });
    }; // render Popover to ask for confirmation

    // Handlers for Modal
    const handleOpenConfirmationModal = (data: ConfirmationModalData): void => {
        setConfirmationModalData(data);
        setConfirmationModalOpen(true);
    };
    const handleCloseConfirmationModal = () => {
        setConfirmationModalOpen(false);
    };
    const handleSubmitConfirmationModal = (
        data: ConfirmationModalData
    ): void => {
        switch (data.action) {
            case Action.DELETE:
                deleteUser(data.email);
                break;
            case Action.ADD:
                addUser(data.email, data.admin);
                // Clear the form
                setNewUserEmail('');
                setNewUserAdmin(false);
                break;
            case Action.REINVITE:
                reinviteUser(data.email, data.admin);
                break;
        }
        handleCloseConfirmationModal();
    };

    // Handlers for Add User Form
    function handleAddUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        askForConfirmation(newUserEmail, Action.ADD, newUserAdmin);
    }
    function handleNewUserEmailChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setNewUserEmail(event.target.value);
    }
    function handleNewUserAdminChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setNewUserAdmin(event.target.checked);
    }

    return (
        <Layout>
            <h1>User Management</h1>
            <div
                className="ag-theme-quartz" // applying the grid theme
                style={{ height: 520, width: 1000 }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    gridOptions={gridOptions}
                />
            </div>
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={handleCloseConfirmationModal}
                onSubmit={handleSubmitConfirmationModal}
                data={confirmationModalData}
            />
            <fieldset className="form-fieldset">
                <legend>Add User</legend>
                <form onSubmit={handleAddUser}>
                    <div className="form-container">
                        <div className="form-email-section">
                            <input
                                className="form-input-email"
                                name="email"
                                type="email"
                                value={newUserEmail}
                                placeholder="Email"
                                onChange={handleNewUserEmailChange}
                            />
                        </div>
                        <div className="form-admin-section">
                            <label htmlFor="admin">Admin</label>
                            <input
                                checked={newUserAdmin}
                                type="checkbox"
                                id="admin"
                                name="admin"
                                onChange={handleNewUserAdminChange}
                            />
                        </div>
                        <div className="form-submit-section">
                            <input type="submit" value="Add User" />
                        </div>
                    </div>
                </form>
            </fieldset>
        </Layout>
    );
}
