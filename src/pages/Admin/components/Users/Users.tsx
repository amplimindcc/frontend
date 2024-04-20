import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import React, { useEffect, useState, useRef, LegacyRef } from 'react';
import { ColDef, GridOptions } from 'ag-grid-community';
import UsersTableElement from '../../../../interfaces/UsersTableElement';
import { Action } from '../../../../interfaces/Action';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ConfirmationModalData from '../../../../interfaces/ConfirmationModalData';
import Layout from '../Wrapper/Wrapper';
import user from '../../../../services/user';
import './Users.css';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

export default function Users() {
    // Create a gridRef
    const gridRef: LegacyRef<AgGridReact> = useRef<AgGridReact>(null);

    // Add User Form State
    const [newUserAdmin, setNewUserAdmin] = useState<boolean>(false);
    const [newUserEmail, setNewUserEmail] = useState<string>('');

    // Modal State
    const [isConfirmationModalOpen, setConfirmationModalOpen] =
        useState<boolean>(false);
    const [confirmationModalData, setConfirmationModalData] =
        useState<ConfirmationModalData>({
            action: Action.DELETE,
            email: '',
        });

    // Grid Options
    const gridOptions: GridOptions = {
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 25, 50, 100],
    };

    // Row Data
    const [rowData, setRowData] = useState<UsersTableElement[]>([]);
    const fetchUsers = async () => {
        const res = await user.list()
            .then((res) => res.json());
        setRowData(JSON.parse(res));
    };
    useEffect(() => {
        let done = false;
        fetchUsers();
        return () => {
            done = true;
        }
    }, [rowData]);

    // Cell Renderers
    const elevateButtonRenderer = (params: any) =>
        !params.data.admin ? (
            <button
                onClick={() =>
                    askForConfirmation(params.data.email, Action.ELEVATE)
                }
            >
                Elevate
            </button>
        ) : (
            <button
                onClick={() =>
                    askForConfirmation(params.data.email, Action.DEMOTE)
                }
            >
                Demote
            </button>
        );

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
            headerName: 'Elevate',
            filter: false,
            sortable: false,
            cellRenderer: elevateButtonRenderer,
            cellRendererParams: { label: 'Elevate' },
        },
        {
            headerName: 'Delete',
            filter: false,
            sortable: false,
            cellRenderer: deleteButtonRenderer,
            cellRendererParams: { label: 'Delete' },
        },
    ]);

    // Cell Components
    const ElevateButton = () => {
        return <button>Elevate</button>;
    };
    const DeleteButton = () => {
        return <button>Delete</button>;
    };
    const DemoteButton = () => {
        return <button>Demote</button>;
    };

    // Functions
    const elevateUser = async (email: string) => {
        // Client Side Data Transaction Update
        const transaction = {
            update: [{ email: email, admin: true }],
        };
        const res: Response = await user.usermod(email, true);
        if (res.ok) {
            gridRef.current?.api.applyTransactionAsync(transaction);
        }
        else {
            // TODO: Throw Error Toast
        }
    };
    const demoteUser = async (email: string) => {
        // Client Side Data Transaction Update
        const transaction = {
            update: [{ email: email, admin: false }],
        };
        const res: Response = await user.usermod(email, false);
        if (res.ok) {
            gridRef.current?.api.applyTransactionAsync(transaction);
        }
        else {
            // TODO: Throw Error Toast
        }
    };
    const deleteUser = async (email: string) => {
        // Client Side Data Transaction Update
        const transaction = {
            remove: [{ email: email }],
        };
        const res: Response = await user.remove(email);
        if (res.ok) {
            gridRef.current?.api.applyTransactionAsync(transaction);
        }
        else {
            // TODO: Throw Error Toast
        }
    };
    const addUser = async (email: string, admin: boolean) => {
        // Client Side Data Transaction Update
        const transaction = {
            add: [{ email: email, admin: admin }],
        };
        const res: Response = await user.add(email, admin);
        if (res.ok) {
            gridRef.current?.api.applyTransactionAsync(transaction);
        }
        else {
            // TODO: Throw Error Toast
        }
    };
    const askForConfirmation = (email: string, action: Action) => {
        handleOpenConfirmationModal({
            email: email,
            action: action,
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
            case Action.ELEVATE:
                elevateUser(data.email);
                break;
            case Action.DEMOTE:
                demoteUser(data.email);
                break;
            case Action.ADD:
                addUser(data.email, false);
                break;
        }
        handleCloseConfirmationModal();
    };

    // Handler for Add User Form
    function handleAddUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        addUser(newUserEmail, newUserAdmin);
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
