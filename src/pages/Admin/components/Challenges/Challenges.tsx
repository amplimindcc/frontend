import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { useState, useRef, LegacyRef, useEffect } from 'react';
import { ColDef, GridOptions } from 'ag-grid-community';
import './Challenges.css';
import ChallengeTableElement from '../../../../interfaces/ChallengeTableElement';
import { ChallengeDescription } from './components/ChallengeDescription';
import { MilkdownProvider } from '@milkdown/react';
import challenge from '../../../../services/challenge';
import toast from '../../../../services/toast';
import { ToastType } from '../../../../interfaces/ToastType';
import Button from '../../../../components/Button/Button';
import { useTranslation } from 'react-i18next';

export default function Challenges() {
    const { t } = useTranslation(['admin', 'main']);

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
            description: `**solve the math problem** `,
            title: '# Simple Math',
        },
    ]);

    const [newTitle, setNewTitle] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');

    useEffect(() => {
        let hasBeenExecuted = false;
        const fetchData = async () => {
            try {
                const res = await challenge.list();
                if (res.ok) {
                    const data = await res.json();
                    setRowData(parseJson(data));
                } else {
                    const data = await res.json();
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(res.status, data.error)
                    );
                }
            } catch (e: any) {
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

    function parseJson(jsonArray: any[]): ChallengeTableElement[] {
        return jsonArray.map((item) => ({
            id: item.id,
            description: item.description,
            title: item.title,
            active: item.active,
        }));
    }

    const deleteButtonRenderer = (params: any) => (
        <Button
            text={t('buttonDelete', { ns: 'main' })}
            handleClick={() =>
                deleteChallenge(params.node.data.id, params.node.data)
            }
        />
    );

    const descriptionRenderer = (params: any) => (
        <>
            <input
                type="text"
                onChange={(e) => handleChangeTitle(params.node.data.id, e)}
                defaultValue={params.node.data.title}
            ></input>
            <br />
            <MilkdownProvider>
                <ChallengeDescription
                    isEditingEnabled={false}
                    onChange={() => null}
                    id={0}
                    description={params.node.data.description}
                />
            </MilkdownProvider>
        </>
    );

    const activeRenderer = (params: any) => (
        <>
            <input
                type="checkbox"
                defaultChecked={params.data.active}
                onChange={(e) => setChallengeActive(params.data.id, e)}
            ></input>
        </>
    );

    // Handler for Add Challenge Form
    function handleAddChallenge(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        addChallenge();
    }

    function handleTitleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTitle(event.target.value);
    }

    function handleOnDescriptionChange(description: string) {
        setNewDescription(description);
    }

    async function handleChangeTitle(
        id: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        try {
            const res: Response = await challenge.changeTitle(
                id,
                event.target.value
            );
            if (res.ok) {
            } else {
                const data = await res.json();
                toast.showToast(
                    ToastType.ERROR,
                    toast.httpError(res.status, data.error)
                );
            }
        } catch (e: any) {
            toast.showToast(ToastType.ERROR, e.message);
        }
    }

    const deleteChallenge = async (id: number, row: any) => {
        try {
            const res: Response = await challenge.remove(id);
            if (res.ok) {
                gridRef.current?.api.applyTransactionAsync({ remove: [row] });
                toast.showToast(
                    ToastType.SUCCESS,
                    t('successChallengeDeleted', { id: id })
                );
            } else {
                const data = await res.json();
                toast.showToast(
                    ToastType.ERROR,
                    toast.httpError(res.status, data.error)
                );
            }
        } catch (e: any) {
            toast.showToast(ToastType.ERROR, e.message);
        }
    };

    const setChallengeActive = async (
        id: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            const res: Response = await challenge.setActive(
                id,
                event.target.checked
            );
            if (res.ok) {
                toast.showToast(
                    ToastType.SUCCESS,
                    `Challenge with id ${id} has been set to active.`
                );
            } else {
                const data = await res.json();
                toast.showToast(
                    ToastType.ERROR,
                    toast.httpError(res.status, data.error)
                );
            }
        } catch (e: any) {
            toast.showToast(ToastType.ERROR, e.message);
        }
    };

    const addChallenge = async () => {
        try {
            const res: Response = await challenge.add(
                newTitle,
                newDescription,
                false
            );
            if (res.ok) {
                interface ChallengeInBackend {
                    title: string;
                    description: string;
                    active: boolean;
                }
                const updatedRowData = rowData;
                const json: ChallengeInBackend = {
                    title: newTitle,
                    description: newDescription,
                    active: false,
                };
                let i = 0;
                let biggestIndex =
                    gridRef.current?.api.getDisplayedRowAtIndex(i)?.data.id;
                while (i + 1 != gridRef.current?.api.getDisplayedRowCount()) {
                    if (
                        gridRef.current?.api.getDisplayedRowAtIndex(i + 1)?.data
                            .id > biggestIndex
                    ) {
                        biggestIndex =
                            gridRef.current?.api.getDisplayedRowAtIndex(i + 1)
                                ?.data.id;
                    }
                    i++;
                }
                const challenge: ChallengeTableElement = {
                    description: json.description,
                    title: json.title,
                    active: json.active,
                    id: biggestIndex + 1,
                };
                updatedRowData.push(challenge);
                setRowData(updatedRowData);
                const transaction = {
                    add: [challenge],
                };
                gridRef.current?.api.applyTransactionAsync(transaction);
            } else {
                const data = await res.json();
                toast.showToast(
                    ToastType.ERROR,
                    toast.httpError(res.status, data.error)
                );
            }
        } catch (e: any) {
            toast.showToast(ToastType.ERROR, e.message);
        }
    };

    // Column Definitions
    const [colDefs, setColDefs] = useState<ColDef<ChallengeTableElement>[]>([]);
    useEffect(() => {
        setColDefs([
            {
                headerName: t('tableHeaderId'),
                field: 'id',
                cellDataType: 'number',
                sortable: true,
                editable: false,
                maxWidth: 80,
            },
            {
                headerName: t('tableHeaderActive'),
                field: 'active',
                cellDataType: 'boolean',
                sortable: false,
                editable: true,
                maxWidth: 80,
                cellRenderer: activeRenderer,
            },
            {
                headerName: t('tableHeaderDescription'),
                field: 'description',
                filter: false,
                sortable: false,
                flex: 1,
                autoHeight: true,
                cellRenderer: descriptionRenderer,
            },
            {
                headerName: t('tableHeaderDelete'),
                filter: false,
                sortable: false,
                cellRenderer: deleteButtonRenderer,
            },
        ]);
    }, [t]);

    return (
        <div className="center">
            <h1>{t('challengesTitle')}</h1>
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
                <legend>{t('addChallenge')}</legend>
                <input
                    name="title"
                    type="text"
                    placeholder={t('inputPlaceholderAddChallenge')}
                    onChange={handleTitleOnChange}
                />
                <div>
                    <label>{t('labelDescription')}</label>
                    <MilkdownProvider>
                        <ChallengeDescription
                            isEditingEnabled={true}
                            onChange={handleOnDescriptionChange}
                            id={0}
                            description={''}
                        />
                    </MilkdownProvider>
                </div>
                <form onSubmit={handleAddChallenge}>
                    <div className="form-container">
                        <div className="form-submit-section">
                            <Button text={t('addChallenge')} />
                        </div>
                    </div>
                </form>
            </fieldset>
        </div>
    );
}
