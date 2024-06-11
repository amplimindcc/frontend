import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { useState, useRef, LegacyRef, useEffect } from 'react';
import { ColDef, GridOptions } from 'ag-grid-community';
import './Submissions.css';
import UserSubmissionTableElement from '../../../../interfaces/UserSubmissionTableElement';
import Button from '../../../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import submission from '../../../../services/submission';
import toast from '../../../../services/toast';
import { ToastType } from '../../../../interfaces/ToastType';
import moment from 'moment';
import { useAGGridLocaleContext } from '../../../../components/Context/AGGridLocaleContext/useAGGridLocaleContext';
import { StatusCodes } from 'http-status-codes';

const baseURL = import.meta.env.VITE_API_URL;
/**
 * Submissions component used in the admin submissions page.
 * @author Timo Hauser
 *
 * @export
 * @returns {React.ReactNode}
 */
export default function Submissions() {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['admin', 'main']);
    /**
     * AG Grid Locale Context
     * @author Timo Hauser
     *
     * @type {AGGridLocale}
     */
    const { gridLocale } = useAGGridLocaleContext();

    /**
     * AG Grid Reference
     * @author Timo Hauser
     *
     * @type {LegacyRef<AgGridReact>}
     */
    const gridRef: LegacyRef<AgGridReact> = useRef<AgGridReact>(null);

    /**
     * AG Grid Options
     * @author Timo Hauser
     *
     * @type {GridOptions}
     */
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

    /**
     * Row Data State
     * @author Timo Hauser
     *
     * @type {UserSubmissionTableElement[]}
     */
    const [rowData, setRowData] = useState<UserSubmissionTableElement[]>([]);

    useEffect(() => {
        const connect = async () => {
            try {
                const res = await submission.heartbeat();
                if (!res.ok) {
                    const data = await res.json();
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(res.status, data.error)
                    );
                } else {
                    const sse = new EventSource(
                        `${baseURL}/v1/admin/submission/status/subscribe`,
                        { withCredentials: true }
                    );
                    sse.addEventListener(
                        'submission-status-changed',
                        (event) => {
                            if (event.data) {
                                loadSubmissionData();
                            } else {
                                console.log('no data');
                            }
                        }
                    );
                    sse.onerror = () => {
                        connect();
                        toast.showToast(ToastType.INFO, "reconnecting");
                    };
                }
            } catch (e: unknown) {
                toast.showToast(ToastType.ERROR, t('connectionError', { ns: 'main' }));
            }
        };
        connect();

        return () => {
            // clean up
        };
    });

    /**
     * set the state of a submission to reviewed in the backend and update the table afterwards
     * @author Timo Hauser
     * @author David Linhardt
     *
     * @async
     * @param {string} email
     * @returns {void}
     */
    const setStateReviewed = async (email: string) => {
        try {
            const res = await submission.reviewSubmission(email);
            switch(res.status) {
                case StatusCodes.OK:
                    // do nothing
                    break;
                case StatusCodes.BAD_REQUEST:
                    toast.showToast(ToastType.ERROR, t('setReviewedBadRequest'));
                    break;
                case StatusCodes.NOT_FOUND:
                    toast.showToast(ToastType.ERROR, t('setReviewedNotFound', { email: email }));
                    break;
                case StatusCodes.UNPROCESSABLE_ENTITY:
                    toast.showToast(ToastType.ERROR, t('setReviewedUnprocessableEntity', { email: email }));
                    break;
                default:
                    toast.showToast(ToastType.ERROR, t('setReviewedError', { email: email }));
                    break;
            }
        } catch (e: unknown) {
            toast.showToast(ToastType.ERROR, t('connectionError', { ns: 'main' }));
        }
        finally{
            loadSubmissionData();
        }
    }

    function loadSubmissionData() {
        let hasBeenExecuted = false;
        /**
         * Parses the JSON data from the backend into the UserSubmissionTableElement interface.
         * @author Timo Hauser
         *
         * @param {JsonSubmissionItem[]} jsonArray
         * @returns {UserSubmissionTableElement[]}
         */
        function parseJson(
            jsonArray: JsonSubmissionItem[]
        ): UserSubmissionTableElement[] {
            return jsonArray.map((item) => ({
                email: item.userEmail,
                id: item.projectID,
                link: '',
                state: item.status,
                turnInDate:
                    moment(item.turnInDate).format('DD.MM.YYYY hh:mm') ==
                    'Invalid date'
                        ? 'No Date'
                        : moment(item.turnInDate).format('DD.MM.YYYY hh:mm'),
                expirationDate:
                    moment(item.expirationDate).format('DD.MM.YYYY hh:mm') ==
                    'Invalid date'
                        ? 'No Date'
                        : moment(item.expirationDate).format(
                              'DD.MM.YYYY hh:mm'
                          ),
            }));
        }
        /**
         * Fetches the submissions from the backend and sets the rowData state accordingly.
         * @author Timo Hauser
         * @author David Linhardt
         *
         * @async
         * @returns {void}
         */
        const fetchData = async () => {
            try {
                const res = await submission.list();
                if (res.ok) {
                    const data = await res.json();
                    setRowData(parseJson(data));
                } else {
                    toast.showToast(
                        ToastType.ERROR,
                        t('errorFetchingChallenges')
                    );
                }
            } catch (e: unknown) {
                toast.showToast(ToastType.ERROR, t('connectionError', { ns: 'main' }));
            }
        };
        if (!hasBeenExecuted) {
            fetchData();
        }
        return () => {
            hasBeenExecuted = true; // Cleanup
        };
    }

    useEffect(() => {
        loadSubmissionData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /**
     * JSON Submission Item Interface for the backend response data.
     * @author Timo Hauser
     *
     * @interface JsonSubmissionItem
     * @typedef {JsonSubmissionItem}
     */
    interface JsonSubmissionItem {
        userEmail: string;
        projectID: number;
        status: string;
        turnInDate: string;
        expirationDate: string;
    }

    // Functions
    /**
     * Open the result github page in a new window
     * @author David Linhardt
     *
     * @param {string} email
     */
    const openGithubPage = async (email: string) => {
        try {
            const res: Response = await submission.getResultPageLink(email);
            switch (res.status) {
                case StatusCodes.OK:
                    const url: string = (await res.json()).repositoryUrl;
                    window.open(url);
                    break;
                case StatusCodes.NOT_FOUND:
                    toast.showToast(ToastType.ERROR, t('resultNotFound'));
                    break;
                case StatusCodes.BAD_REQUEST:
                    toast.showToast(ToastType.ERROR, t('resultBadRequest'));
                    break;
                default:
                    toast.showToast(ToastType.ERROR, t('resultError'));
                    break;
            }
        }
        catch(e: unknown) {
            if (e instanceof Error) {
                toast.showToast(ToastType.ERROR, e.message);
            }
        }
    };

    // Cell Renderers
    /**
     * Interface for the ButtonRendererParams used in the resultButtonRenderer function.
     * @author David Linhardt
     *
     * @interface ButtonRendererParams
     * @typedef {ButtonRendererParams}
     */
    interface ButtonRendererParams {
        label: string;
        data: UserSubmissionTableElement;
    }
    /**
     * Button Renderer for the result button in the AG Grid. Opens the result in a new tab when clicked.
     * @author Timo Hauser
     *
     * @param {ButtonRendererParams} params
     * @returns {React.ReactNode}
     */
    const resultButtonRenderer = (params: ButtonRendererParams) =>
        params.data.state == 'SUBMITTED' ? (
            <div className="center">
                <Button
                    text={params.label}
                    handleClick={() => {
                        openGithubPage(params.data.email);
                    }}
                />
            </div>
        ) : null;

    /**
     * Interface for the TextRendererParams used in the stateTextRenderer function.
     * @author David Linhardt
     *
     * @interface TextRendererParams
     * @typedef {TextRendererParams}
     */
    interface TextRendererParams {
        value: string;
        data: UserSubmissionTableElement;
    }
    /**
     * AG Grid Cell Renderer for State Text
     * @author Timo Hauser
     *
     * @param {TextRendererParams} params
     * @returns {React.ReactNode}
     */
    const stateTextRenderer = (params: TextRendererParams) => (
        <>
            <label className='state-label'>{params.value}</label>
            {params.value == 'SUBMITTED' && <Button handleClick={() => setStateReviewed(params.data.email)} text={t('setReviewedButton')}></Button>}
        </>
    );

    /**
     * Column Definitions State
     * @author Timo Hauser
     *
     * @type {ColDef<UserSubmissionTableElement>[]}
     */
    const [colDefs, setColDefs] = useState<
        ColDef<UserSubmissionTableElement>[]
    >([]);
    useEffect(() => {
        setColDefs([
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
                minWidth: 200,
            },
            {
                headerName: t('tableHeaderResult'),
                field: 'link',
                filter: false,
                sortable: true,
                editable: false,
                cellRenderer: resultButtonRenderer,
                cellRendererParams: {
                    label: t('buttonResult', { ns: 'main' }),
                },
                cellClass: 'cell-vertical-align-text-center',
                maxWidth: 100,
            },
            {
                headerName: t('tableHeaderState'),
                field: 'state',
                filter: true,
                sortable: true,
                cellRenderer: stateTextRenderer,
                cellClass: 'cell-vertical-align-text-center',
                minWidth: 250,
            },
            {
                headerName: t('tableHeaderTurnIn'),
                field: 'turnInDate',
                filter: false,
                sortable: true,
                cellClass: 'cell-vertical-align-text-center',
            },
            {
                headerName: t('tableHeaderExpiration'),
                field: 'expirationDate',
                filter: false,
                sortable: true,
                cellClass: 'cell-vertical-align-text-center',
            },
            {
                headerName: t('tableHeaderId'),
                field: 'id',
                filter: false,
                sortable: true,
                cellClass: 'cell-vertical-align-text-center',
                maxWidth: 50,
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    return (
        <div className="admin-wrapper">
            <h1>{t('submissionTitle')}</h1>
            <div
                className="ag-theme-quartz" // applying the grid theme
                style={{ height: 540, width: 1000 }}
                data-testid="submission-table-container"
            >
                <AgGridReact
                    key={JSON.stringify(gridLocale)}
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    gridOptions={gridOptions}
                    localeText={gridLocale}
                    data-testid="submissions-table"
                />
            </div>
        </div>
    );
}
