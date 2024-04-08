import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import React, { useState } from 'react';
import UsersTableElement from '../../../../interfaces/UsersTableElement';
import { ColDef, GridOptions } from 'ag-grid-community';

export default function Users() {
    // Enums
    enum Action {
        ELEVATE,
        DELETE,
    }

    // Grid Options
    const gridOptions: GridOptions = {
        pagination: true,
        paginationPageSize: 50,
        paginationPageSizeSelector: [25, 50, 100],
    };

    // Row Data
    const [rowData, setRowData] = useState<UsersTableElement[]>([
        { email: 'admin@admin.de', admin: true },
        { email: 'user@user.de', admin: false },
    ]);

    // Cell Renderers
    const elevateButtonRenderer = (params: any) =>
        !params.data.admin ? <button>{params.label}</button> : <></>;

    const deleteButtonRenderer = (params: any) => (
        <>
            <button onClick={() => console.log(params.data)}>
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
            sortable: true,
            sort: 'asc', // sort alphabetically
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

    // Functions
    const elevateUser = (email: string) => {};
    const deleteUser = (email: string) => {};
    const addUser = (email: string, admin: boolean) => {};
    const askForConfirmation = (email: string, action: Action) => {
        if (action === Action.ELEVATE) {
        } else if (action === Action.DELETE) {
        }
    }; // render Popover to ask for confirmation

    // TODO: https://blog.logrocket.com/creating-reusable-pop-up-modal-react/#what-modal-dialog

    return (
        <>
            <div
                className="ag-theme-quartz" // applying the grid theme
                style={{ height: 500, width: 1000 }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    gridOptions={gridOptions}
                />
            </div>
        </>
    );
}
