import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { useState } from 'react';
import UsersTableElement from '../../../interfaces/UsersTableElement';
import { ColDef } from 'ag-grid-community';

export default function Users() {
    // Row Data
    const [rowData, setRowData] = useState<UsersTableElement[]>([
        { email: 'admin@admin.de', admin: true },
        { email: 'user@user.de', admin: false },
    ]);

    // Column Definitions
    const [colDefs, setColDefs] = useState<ColDef<UsersTableElement>[]>([
        {
            headerName: 'Email',
            field: 'email',
            cellDataType: 'text',
            filter: true,
            sortable: true,
            sort: 'asc',
            editable: false,
        },
        {
            headerName: 'Admin',
            field: 'admin',
            cellDataType: 'boolean',
            filter: true,
            sortable: true,
            editable: false,
            cellRenderer: 'booleanCellRenderer',
            cellRendererParams: { disabled: true },
        },
        {
            headerName: 'Elevate',
            filter: false,
            sortable: false,
            cellRenderer: 'buttonRenderer',
            cellRendererParams: { onClick: () => console.log('elevate button clicked') , label: 'Elevate'},
        },
        {
            headerName: 'Delete',
            filter: false,
            sortable: false,
            cellRenderer: 'buttonRenderer',
            cellRendererParams: { onClick: () => console.log('delete button clicked') , label: 'Delete'},
        },
    ]);

    //TODO: https://www.ag-grid.com/react-data-grid/component-cell-renderer/

    // Table Settings
    const pagination = true;
    const paginationPageSize = 50;
    const paginationPageSizeSelector = [25, 50, 100];

    // Cell Components
    const ElevateButton = () => {
        return <button>Elevate</button>;
    };
    const DeleteButton = () => {
        return <button>Delete</button>;
    };

    return (
        // wrapping container with theme & size
        <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 500, width: 400 }} // the grid will fill the size of the parent container
        >
            <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
    );
}
