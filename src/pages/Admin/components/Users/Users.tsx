import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import React, { useState, useRef, useCallback, LegacyRef } from 'react';
import UsersTableElement from '../../../../interfaces/UsersTableElement';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';
import { Action } from '../../../../interfaces/Action';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ConfirmationModalData from '../../../../interfaces/ConfirmationModalData';
import './Users.css';
import AddUserFormData from '../../../../interfaces/AddUserFormData';
import Layout from '../Wrapper/Wrapper';

export default function Users() {

    // Create a gridRef
    const gridRef: LegacyRef<AgGridReact> = useRef<AgGridReact>(null);

    // Add User Form State
    const [newUserAdmin, setNewUserAdmin] = useState<boolean>(false);
    const [newUserEmail, setNewUserEmail] = useState<string>('');

    // Modal State
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
    const [confirmationModalData, setConfirmationModalData] = useState<ConfirmationModalData>({
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
    // TODO: Fetch Data from API
    const [rowData, setRowData] = useState<UsersTableElement[]>([
        { email: 'admin@admin.de', status: '', admin: true },
        { email: 'user1@user.de', status: 'invited', admin: false },
        { email: 'user2@user.de', status: 'declined', admin: false },
        { email: 'user3@user.de', status: 'ongoing', admin: false },
        { email: 'user4@user.de', status: 'finished', admin: false },
        { email: 'user5@user.de', status: 'invited', admin: false },
        { email: 'user6@user.de', status: 'declined', admin: false },
        { email: 'user7@user.de', status: 'finished', admin: false },
        { email: 'user8@user.de', status: 'ongoing', admin: false },
        { email: 'user9@user.de', status: 'invited', admin: false },
        { email: 'user10@user.de', status: 'declined', admin: false },
        { email: 'user11@user.de', status: 'finished', admin: false },
        { email: 'user12@user.de', status: 'ongoing', admin: false },
        { email: 'user13@user.de', status: 'invited', admin: false },
        { email: 'user14@user.de', status: 'declined', admin: false },
        { email: 'user15@user.de', status: 'finished', admin: false },
        { email: 'user16@user.de', status: 'ongoing', admin: false },
        { email: 'user17@user.de', status: 'invited', admin: false },
        { email: 'user18@user.de', status: 'declined', admin: false },
        { email: 'user19@user.de', status: 'finished', admin: false },
        { email: 'user20@user.de', status: 'ongoing', admin: false },
        { email: 'user21@user.de', status: 'invited', admin: false },
        { email: 'user22@user.de', status: 'declined', admin: false },
        { email: 'user23@user.de', status: 'finished', admin: false },
        { email: 'user24@user.de', status: 'ongoing', admin: false },
        { email: 'user25@user.de', status: 'invited', admin: false },
        { email: 'user26@user.de', status: 'declined', admin: false },
        { email: 'user27@user.de', status: 'finished', admin: false },
        { email: 'user28@user.de', status: 'ongoing', admin: false },
        { email: 'user29@user.de', status: 'invited', admin: false },
        { email: 'user30@user.de', status: 'declined', admin: false },
        { email: 'user31@user.de', status: 'finished', admin: false },
        { email: 'user32@user.de', status: 'ongoing', admin: false },
        { email: 'user33@user.de', status: 'invited', admin: false },
        { email: 'user34@user.de', status: 'declined', admin: false },
        { email: 'user35@user.de', status: 'finished', admin: false },
        { email: 'user36@user.de', status: 'ongoing', admin: false },
        { email: 'user37@user.de', status: 'invited', admin: false },
        { email: 'user38@user.de', status: 'declined', admin: false },
        { email: 'user39@user.de', status: 'finished', admin: false },
        { email: 'user40@user.de', status: 'ongoing', admin: false },
        { email: 'user41@user.de', status: 'invited', admin: false },
        { email: 'user42@user.de', status: 'declined', admin: false },
        { email: 'user43@user.de', status: 'finished', admin: false },
        { email: 'user44@user.de', status: 'ongoing', admin: false },
        { email: 'user45@user.de', status: 'invited', admin: false },
        { email: 'user46@user.de', status: 'declined', admin: false },
        { email: 'user47@user.de', status: 'finished', admin: false },
        { email: 'user48@user.de', status: 'ongoing', admin: false },
        { email: 'user49@user.de', status: 'invited', admin: false },
        { email: 'user50@user.de', status: 'declined', admin: false },
        { email: 'user51@user.de', status: 'finished', admin: false },
        { email: 'user52@user.de', status: 'ongoing', admin: false },
        { email: 'user53@user.de', status: 'invited', admin: false },
        { email: 'user54@user.de', status: 'declined', admin: false },
        { email: 'user55@user.de', status: 'finished', admin: false },
        { email: 'user56@user.de', status: 'ongoing', admin: false },
        { email: 'user57@user.de', status: 'invited', admin: false },
        { email: 'user58@user.de', status: 'declined', admin: false },
        { email: 'user59@user.de', status: 'finished', admin: false },
        { email: 'user60@user.de', status: 'ongoing', admin: false },
        { email: 'user61@user.de', status: 'invited', admin: false },
        { email: 'user62@user.de', status: 'declined', admin: false },
        { email: 'user63@user.de', status: 'finished', admin: false },
        { email: 'user64@user.de', status: 'ongoing', admin: false },
        { email: 'user65@user.de', status: 'invited', admin: false },
        { email: 'user66@user.de', status: 'declined', admin: false },
        { email: 'user67@user.de', status: 'finished', admin: false },
        { email: 'user68@user.de', status: 'ongoing', admin: false },
        { email: 'user69@user.de', status: 'invited', admin: false },
        { email: 'user70@user.de', status: 'declined', admin: false },
        { email: 'user71@user.de', status: 'finished', admin: false },
        { email: 'user72@user.de', status: 'ongoing', admin: false },
        { email: 'user73@user.de', status: 'invited', admin: false },
        { email: 'user74@user.de', status: 'declined', admin: false },
        { email: 'user75@user.de', status: 'finished', admin: false },
        { email: 'user76@user.de', status: 'ongoing', admin: false },
        { email: 'user77@user.de', status: 'invited', admin: false },
        { email: 'user78@user.de', status: 'declined', admin: false },
        { email: 'user79@user.de', status: 'finished', admin: false },
        { email: 'user80@user.de', status: 'ongoing', admin: false },
        { email: 'user81@user.de', status: 'invited', admin: false },
        { email: 'user82@user.de', status: 'declined', admin: false },
        { email: 'user83@user.de', status: 'finished', admin: false },
        { email: 'user84@user.de', status: 'ongoing', admin: false },
        { email: 'user85@user.de', status: 'invited', admin: false },
        { email: 'user86@user.de', status: 'declined', admin: false },
        { email: 'user87@user.de', status: 'finished', admin: false },
        { email: 'user88@user.de', status: 'ongoing', admin: false },
        { email: 'user89@user.de', status: 'invited', admin: false },
        { email: 'user90@user.de', status: 'declined', admin: false },
        { email: 'user91@user.de', status: 'finished', admin: false },
        { email: 'user92@user.de', status: 'ongoing', admin: false },
        { email: 'user93@user.de', status: 'invited', admin: false },
        { email: 'user94@user.de', status: 'declined', admin: false },
        { email: 'user95@user.de', status: 'finished', admin: false },
        { email: 'user96@user.de', status: 'ongoing', admin: false },
        { email: 'user97@user.de', status: 'invited', admin: false },
        { email: 'user98@user.de', status: 'declined', admin: false },
        { email: 'user99@user.de', status: 'finished', admin: false },
        { email: 'user100@user.de', status: 'ongoing', admin: false },
    ]);

    // Cell Renderers
    const elevateButtonRenderer = (params: any) =>
        !params.data.admin ? <button onClick={() => askForConfirmation(params.data.email, Action.ELEVATE)}>
            Elevate
        </button> : <button onClick={() => askForConfirmation(params.data.email, Action.DEMOTE)}>
            Demote
        </button>;

    const deleteButtonRenderer = (params: any) => (
        <>
            <button onClick={() => askForConfirmation(params.data.email, Action.DELETE)}>
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
                filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith'],
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
    }

    // Functions
    const elevateUser = (email: string) => {
        // Client Side Data Transaction Update
        const transaction = {
            update: [{ email: email, admin: true }],
        };
        gridRef.current?.api.applyTransactionAsync(transaction);
        // TODO: API Call
    };
    const demoteUser = (email: string) => {
        // Client Side Data Transaction Update
        const transaction = {
            update: [{ email: email, admin: false }],
        };
        gridRef.current?.api.applyTransactionAsync(transaction);
        // TODO: API Call
    };
    const deleteUser = (email: string) => {
        // Client Side Data Transaction Update
        const transaction = {
            remove: [{ email: email }],
        };
        gridRef.current?.api.applyTransactionAsync(transaction);
        // TODO: API Call
    };
    const addUser = (email: string, admin: boolean) => {
        // Client Side Data Transaction Update
        const transaction = {
            add: [{ email: email, admin: admin }],
        };
        gridRef.current?.api.applyTransactionAsync(transaction);
        // TODO: API Call
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
    const handleSubmitConfirmationModal = (data: ConfirmationModalData): void => {
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
    function handleNewUserEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewUserEmail(event.target.value);
    }
    function handleNewUserAdminChange(event: React.ChangeEvent<HTMLInputElement>) {
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
            <fieldset>
                <legend>Add User</legend>
                <form onSubmit={handleAddUser}>
                    <div>
                        <div>
                            <input name="email" type="email" value={newUserEmail} placeholder="Email" onChange={handleNewUserEmailChange} />
                        </div>
                        <div>
                            <label htmlFor="admin">Admin</label>
                            <input checked={newUserAdmin} type="checkbox" id="admin" name="admin" onChange={handleNewUserAdminChange} />
                        </div>
                        <div>
                            <input type="submit" value="Add User" />
                        </div>
                    </div>
                </form>
            </fieldset>
        </Layout>
    );
}
