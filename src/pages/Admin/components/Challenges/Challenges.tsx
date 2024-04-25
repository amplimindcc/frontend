import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { useState, useRef, LegacyRef } from 'react';
import { ColDef, GridOptions } from 'ag-grid-community';
import './Challenges.css';
import Layout from '../Wrapper/Wrapper';
import ChallengeTableElement from '../../../../interfaces/ChallengeTableElement';
import { ChallengeDescription } from '../../../../interfaces/ChallengeDescription';
import { MilkdownProvider } from '@milkdown/react'

export default function Challenges() {
    // Create a gridRef
    const gridRef: LegacyRef<AgGridReact> = useRef<AgGridReact>(null);

    // Grid Options
    const gridOptions: GridOptions = {
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 25, 50, 100],
        rowHeight: 142,
    };

    // Row Data
    // TODO: Fetch Data from API
    const [rowData, setRowData] = useState<ChallengeTableElement[]>([
        {
            id: 0,
            active: false,
            description: `# Simple Math \n **solve the math problem** `,
        },
        {
            id: 1,
            active: false,
            description: 'Tree Search',
        },
        {
            id: 2,
            active: false,
            description: 'A*',
        },
        {
            id: 3,
            active: false,
            description: 'Challenge 3',
        },
    ]);

    const deleteButtonRenderer = (params: any) => (
        <>
            <button onClick={() =>
                gridRef.current?.api.applyTransactionAsync({ remove: [params.node.data] })
            }>
                Delete
            </button>
        </>
    );

    const descriptionRenderer = (params: any) => (
        <>
            <MilkdownProvider>
                <ChallengeDescription id={0} description={params.value} />
            </MilkdownProvider>
        </>
    )

    // Handler for Add Challenge Form
    function handleAddChallenge(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        addChallenge();
    }
    const addChallenge = () => {
        // Client Side Data Transaction Update
        let index = gridRef.current?.api.getDisplayedRowAtIndex(gridRef.current.api.getDisplayedRowCount()-1)?.data.id;
        if(index == undefined) index = 0;
        const transaction = {
            add: [{ description: "", active: false, id: index + 1 }]
        };
        gridRef.current?.api.applyTransactionAsync(transaction);
        // TODO: API Call
    };

    // Column Definitions
    const [colDefs, setColDefs] = useState<
        ColDef<ChallengeTableElement>[]
    >([
        {
            headerName: 'ID',
            field: 'id',
            cellDataType: 'number',
            sortable: true,
            editable: false,
            maxWidth: 80,
        },
        {
            headerName: 'Active',
            field: 'active',
            cellDataType: 'boolean',
            sortable: true,
            editable: true,
            maxWidth: 80,
        },
        {
            headerName: 'Description',
            field: 'description',
            filter: false,
            sortable: false,
            flex: 1,
            autoHeight: true,
            cellRenderer: descriptionRenderer,
        },
        {
            headerName: 'Delete',
            filter: false,
            sortable: false,
            cellRenderer: deleteButtonRenderer,
        },
    ]);

    return (
        <Layout>
            <h1>Challenges</h1>
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
            <fieldset className="form-fieldset">
                <legend>Add Challenge</legend>
                <form onSubmit={handleAddChallenge}>
                    <div className="form-container">
                        <div className="form-submit-section">
                            <input type="submit" value="Add Challenge" />
                        </div>
                    </div>
                </form>
            </fieldset>
        </Layout>
    );
}
