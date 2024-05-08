import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { useState, useRef, LegacyRef } from 'react';
import { ColDef, GridOptions } from 'ag-grid-community';
import './Submissions.css';
import UserSubmissionTableElement from '../../../../interfaces/UserSubmissionTableElement';
import { SubmissionState } from '../../../../interfaces/SubmissionState';
import Button from '../../../../components/Button/Button';
import { useTranslation } from 'react-i18next';

export default function Submissions() {
    const { t } = useTranslation(['admin', 'main']);

    // Create a gridRef
    const gridRef: LegacyRef<AgGridReact> = useRef<AgGridReact>(null);

    // Grid Options
    const gridOptions: GridOptions = {
        pagination: true,
        paginationPageSize: 8,
        paginationPageSizeSelector: [8, 25, 50, 100],
        rowHeight: 55,
        autoSizeStrategy: {
            type: 'fitGridWidth',
            defaultMinWidth: 50,
        },
    };

    // Row Data
    // TODO: Fetch Data from API
    const [rowData, setRowData] = useState<UserSubmissionTableElement[]>([
        {
            email: 'user0@user0.de',
            link: 'https://www.google.com/',
            state: SubmissionState.INPROGRESS,
            id: 0,
        },
        {
            email: 'user1@user1.de',
            link: 'https://www.google.com/',
            state: SubmissionState.READY,
            id: 1,
        },
        {
            email: 'user2@user2.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 2,
        },
        {
            email: 'user3@user3.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 3,
        },
        {
            email: 'user4@user4.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 4,
        },
        {
            email: 'user5@user5.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 5,
        },
        {
            email: 'user6@user6.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 6,
        },
        {
            email: 'user7@user7.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 7,
        },
        {
            email: 'user8@user8.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 8,
        },
        {
            email: 'user9@user9.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 9,
        },
        {
            email: 'user10@user10.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 10,
        },
        {
            email: 'user11@user11.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 11,
        },
        {
            email: 'user12@user12.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 12,
        },
        {
            email: 'user13@user13.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 13,
        },
        {
            email: 'user14@user14.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 14,
        },
        {
            email: 'user15@user15.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 15,
        },
        {
            email: 'user16@user16.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 16,
        },
        {
            email: 'user17@user17.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 17,
        },
        {
            email: 'user18@user18.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 18,
        },
        {
            email: 'user19@user19.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 19,
        },
        {
            email: 'user20@user20.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 20,
        },
        {
            email: 'user21@user21.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 21,
        },
        {
            email: 'user22@user22.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 22,
        },
        {
            email: 'user23@user23.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 23,
        },
        {
            email: 'user24@user24.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 24,
        },
        {
            email: 'user25@user25.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 25,
        },
        {
            email: 'user26@user26.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 26,
        },
        {
            email: 'user27@user27.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 27,
        },
        {
            email: 'user28@user28.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 28,
        },
        {
            email: 'user29@user29.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 29,
        },
        {
            email: 'user30@user30.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 30,
        },
        {
            email: 'user31@user31.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 31,
        },
        {
            email: 'user32@user32.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 32,
        },
        {
            email: 'user33@user33.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 33,
        },
        {
            email: 'user34@user34.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 34,
        },
        {
            email: 'user35@user35.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 35,
        },
        {
            email: 'user36@user36.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 36,
        },
        {
            email: 'user37@user37.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 37,
        },
        {
            email: 'user38@user38.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 38,
        },
        {
            email: 'user39@user39.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 39,
        },
        {
            email: 'user40@user40.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 40,
        },
        {
            email: 'user41@user41.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 41,
        },
        {
            email: 'user42@user42.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 42,
        },
        {
            email: 'user43@user43.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 43,
        },
        {
            email: 'user44@user44.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 44,
        },
        {
            email: 'user45@user45.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 45,
        },
        {
            email: 'user46@user46.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 46,
        },
        {
            email: 'user47@user47.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 47,
        },
        {
            email: 'user48@user48.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 48,
        },
        {
            email: 'user49@user49.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 49,
        },
        {
            email: 'user50@user50.de',
            link: 'https://www.google.com/',
            state: SubmissionState.FINISHED,
            id: 50,
        },
    ]);

    // Cell Renderers
    const resultButtonRenderer = (params: any) => (
        <form action={params.value} target='_blank'>
            { params.data.state == SubmissionState.FINISHED && <Button text={t('buttonResult', { ns: 'main'})} />}
        </form>
    );

    const stateTextRenderer = (params: any) => (
        <text>{SubmissionState[params.value]}</text>
    );

    // Column Definitions
    const [colDefs, setColDefs] = useState<
        ColDef<UserSubmissionTableElement>[]
    >([
        {
            headerName: t('tableHeaderEmail'),
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
            editable: false,
            cellClass: 'cell-vertical-align-text-center',
        },
        {
            headerName: t('tableHeaderResult'),
            field: 'link',
            filter: false,
            sortable: true,
            editable: false,
            cellRenderer: resultButtonRenderer,
            cellClass: 'cell-vertical-align-text-center',
        },
        {
            headerName: t('tableHeaderState'),
            field: 'state',
            filter: true,
            sortable: true,
            cellRenderer: stateTextRenderer,
            cellClass: 'cell-vertical-align-text-center',
        },
        {
            headerName: t('tableHeaderId'),
            field: 'id',
            filter: false,
            sortable: true,
            cellClass: 'cell-vertical-align-text-center',
        },
    ]);

    return (
        <div className="center">
            <h1>{t('submissionTitle')}</h1>
            <div
                className="ag-theme-quartz" // applying the grid theme
                style={{ height: 540, width: 1000 }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    gridOptions={gridOptions}
                />
            </div>
        </div>
    );
}
