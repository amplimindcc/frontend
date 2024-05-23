import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import React, { useEffect, useState, useRef, LegacyRef } from 'react';
import { ColDef, GridOptions } from 'ag-grid-community';
import UsersTableElement from '../../../../interfaces/UsersTableElement';
import { Action } from '../../../../interfaces/Action';
import { ToastType } from '../../../../interfaces/ToastType';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ConfirmationModalData from '../../../../interfaces/ConfirmationModalData';
import user from '../../../../services/user';
import toast from '../../../../services/toast';
import './Users.css';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import Button from '../../../../components/Button/Button';
import ErrorComponent from '../../../../components/Error/Error';
import { useTranslation } from 'react-i18next';
import { useAGGridLocaleContext } from '../../../../components/Context/AGGridLocaleContext/useAGGridLocaleContext';

/**
 * Admin User Management Page
 * @author David Linhardt
 *
 * @export
 * @returns {React.ReactNode}
 */
export default function Users() {
    // Contexts
    /**
     * i18next Context for Translation
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['admin', 'main']);
    /**
     * Context from LangProvider for AG Grid Locale
     * @author David Linhardt
     *
     * @type {AGGridLocale}
     */
    const { gridLocale } = useAGGridLocaleContext();

    // Refs
    /**
     * Grid Reference for AgGridReact Component
     * @author David Linhardt
     *
     * @type {LegacyRef<AgGridReact>}
     */
    const gridRef: LegacyRef<AgGridReact> = useRef<AgGridReact>(null);

    // Add-User-Form States
    /**
     * State for the new user's admin status in the Add User Form
     * @author David Linhardt
     *
     * @type {boolean}
     */
    const [newUserAdmin, setNewUserAdmin] = useState<boolean>(false);
    /**
     * State for the new user's email in the Add User Form
     * @author David Linhardt
     *
     * @type {string}
     */
    const [newUserEmail, setNewUserEmail] = useState<string>('');
    /**
     * State for the error text in the Add User Form
     * @author David Linhardt
     *
     * @type {string}
     */
    const [errorText, setErrorText] = useState<string>('');
    /**
     * State for the validity of the email in the Add User Form
     * @author David Linhardt
     *
     * @type {boolean}
     */
    const [valid, setValid] = useState<boolean>(false);

    // Confirmation-Modal States
    /**
     *State for the Confirmation Modal's Open Status
     * @author David Linhardt
     *
     * @type {boolean}
     */
    const [isConfirmationModalOpen, setConfirmationModalOpen] =
        useState<boolean>(false);
    /**
     * State for the Confirmation Modal's Data
     * @author David Linhardt
     *
     * @type {ConfirmationModalData}
     */
    const [confirmationModalData, setConfirmationModalData] =
        useState<ConfirmationModalData>({
            action: Action.DELETE,
            email: '',
            admin: false,
        });

    /**
     * AgGrid gridOptions for the User Table
     * @author David Linhardt
     *
     * @type {GridOptions}
     */
    const gridOptions: GridOptions = {
        pagination: true,
        paginationPageSize: 9,
        paginationPageSizeSelector: [9, 25, 50, 100],
        rowHeight: 55,
        autoSizeStrategy: {
            type: 'fitGridWidth',
            defaultMinWidth: 50,
        },
    };

    /**
     * AgGrid RowData for the User Table
     * @author David Linhardt
     *
     * @type {UsersTableElement[]}
     */
    const [rowData, setRowData] = useState<UsersTableElement[]>([]);
    useEffect(() => {
        let hasBeenExecuted = false;
        function parseJson(jsonArray: JsonUserItem[]): UsersTableElement[] {
            return jsonArray.map((item) => ({
                email: item.email,
                status: item.status,
                admin: item.isAdmin,
                canBeReinvited: item.canBeReinvited,
                inviteTokenExpiration: item.inviteTokenExpiration,
            }));
        }
        /**
         * Fetch TableData from the Backend and Update the Table
         * @author David Linhardt
         *
         * @async
         * @returns {void}
         */
        const fetchData = async () => {
            try {
                const res = await user.list();
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
            } catch (e: unknown) {
                if (e instanceof Error) {
                    toast.showToast(ToastType.ERROR, e.message);
                }
            }
        };
        if (!hasBeenExecuted) {
            fetchData();
        }
        return () => {
            hasBeenExecuted = true; // Cleanup
        };
    }, []);

    /**
     * Interface for the User JSON as received from the Backend
     * @author David Linhardt
     *
     * @interface JsonUserItem
     * @typedef {JsonUserItem}
     */
    interface JsonUserItem {
        email: string;
        status: string;
        isAdmin: boolean;
        canBeReinvited: boolean;
        inviteTokenExpiration: string;
    }

    /**
     * Column Definitions for the User Table in AgGridReact Component
     * @author David Linhardt
     *
     * @type {ColDef<UsersTableElement>[]}
     */
    const [colDefs, setColDefs] = useState<ColDef<UsersTableElement>[]>([]);
    useEffect(() => {
        // Cell Renderers (Custom Component Renderers)
        interface ButtonRendererParams {
            label: string;
            data: UsersTableElement;
        }
        /**
         * AgGrid Cell Renderer for Delete Button
         * @author David Linhardt
         *
         * @param {ButtonRendererParams} params
         * @returns {React.ReactNode}
         */
        const deleteButtonRenderer = (params: ButtonRendererParams) => (
            <Button
                text={params.label}
                handleClick={() =>
                    askForConfirmation(params.data.email, Action.DELETE)
                }
            />
        );
        /**
         * AgGrid Cell Renderer for Reinvite Button
         * @author David Linhardt
         *
         * @param {ButtonRendererParams} params
         * @returns {React.ReactNode}
         */
        const reinviteButtonRenderer = (params: ButtonRendererParams) =>
            params.data.canBeReinvited ? (
                <Button
                    text={params.label}
                    handleClick={() =>
                        askForConfirmation(params.data.email, Action.REINVITE)
                    }
                />
            ) : null;
        setColDefs([
            {
                headerName: t('tableHeaderEmail'),
                field: 'email',
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 200,
            },
            {
                headerName: t('tableHeaderState'),
                field: 'status',
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 150,
            },
            {
                headerName: t('tableHeaderAdmin'),
                field: 'admin',
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 150,
            },
            {
                headerName: t('tableHeaderInviteTokenExpiration'),
                field: 'inviteTokenExpiration',
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 200,
            },
            {
                headerName: t('tableHeaderDelete'),
                field: 'email',
                cellRenderer: deleteButtonRenderer,
                cellRendererParams: {
                    label: t('buttonDelete', { ns: 'main' }),
                },
                minWidth: 150,
            },
            {
                headerName: t('tableHeaderReinvite'),
                field: 'email',
                cellRenderer: reinviteButtonRenderer,
                cellRendererParams: {
                    label: t('buttonReinvite', { ns: 'main' }),
                },
                minWidth: 150,
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    // Functions
    /**
     * Delete a user from the backend and update the table accordingly
     * @author David Linhardt
     *
     * @async
     * @param {string} email
     * @returns {void}
     */
    const deleteUser = async (email: string) => {
        try {
            const res: Response = await user.remove(email);
            if (res.ok) {
                setRowData((prevRowData) =>
                    prevRowData.filter((user) => user.email !== email)
                );
                toast.showToast(
                    ToastType.SUCCESS,
                    t('successUserDeleted', { mail: email })
                );
            } else {
                const data = await res.json();
                toast.showToast(
                    ToastType.ERROR,
                    toast.httpError(res.status, data.error)
                );
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.showToast(ToastType.ERROR, e.message);
            }
        }
    };
    /**
     * Add a user to the backend and update the table accordingly
     * @author David Linhardt
     *
     * @async
     * @param {string} email
     * @param {boolean} admin
     * @returns {void}
     */
    const addUser = async (email: string, admin: boolean) => {
        try {
            const res: Response = await user.add(email, admin);
            if (res.ok) {
                const updatedRowData = rowData;
                const json: JsonUserItem = await res.json();
                const user: UsersTableElement = {
                    email: json.email,
                    status: json.status,
                    admin: json.isAdmin,
                    canBeReinvited: json.canBeReinvited,
                    inviteTokenExpiration: json.inviteTokenExpiration,
                };
                updatedRowData.push(user);
                setRowData(updatedRowData);
                const transaction = {
                    add: [user],
                };
                gridRef.current?.api.applyTransactionAsync(transaction);
                toast.showToast(
                    ToastType.SUCCESS,
                    t('successUserAdded', { mail: email })
                );
            } else {
                const data = await res.json();
                toast.showToast(
                    ToastType.ERROR,
                    toast.httpError(res.status, data.error)
                );
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.showToast(ToastType.ERROR, e.message);
            }
        }
    };
    /**
     * Reinvite a user in the backend and update the table accordingly
     * @author David Linhardt
     *
     * @async
     * @param {string} email
     * @param {boolean} admin
     * @returns {void}
     */
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
                const user: UsersTableElement = {
                    email: json.email,
                    status: json.status,
                    admin: json.isAdmin,
                    canBeReinvited: json.canBeReinvited,
                    inviteTokenExpiration: json.inviteTokenExpiration,
                };
                updatedRowData.push(user);
                setRowData(updatedRowData);
                toast.showToast(
                    ToastType.SUCCESS,
                    t('successUserReinvite', { mail: email })
                );
            } else {
                const data = await res.json();
                toast.showToast(
                    ToastType.ERROR,
                    toast.httpError(res.status, data.error)
                );
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.showToast(ToastType.ERROR, e.message);
            }
        }
    };
    /**
     * Render Popover to ask for confirmation
     * @author David Linhardt
     *
     * @param {string} email
     * @param {Action} action
     * @param {boolean} [admin=false]
     * @returns {void}
     */
    const askForConfirmation = (
        email: string,
        action: Action,
        admin: boolean = false
    ) => {
        handleOpenConfirmationModal({
            email: email,
            action: action,
            admin: admin,
        });
    };
    /**
     * Check if an email is in a valid format or not
     * @author David Linhardt
     *
     * @param {string} email
     * @returns {boolean}
     */
    function isValidEmail(email: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handlers for Modal
    /**
     * Handler for opening the confirmation modal
     * @author David Linhardt
     *
     * @param {ConfirmationModalData} data
     */
    const handleOpenConfirmationModal = (data: ConfirmationModalData): void => {
        setConfirmationModalData(data);
        setConfirmationModalOpen(true);
    };
    /**
     * Handler for closing the confirmation modal
     * @author David Linhardt
     */
    const handleCloseConfirmationModal = () => {
        setConfirmationModalOpen(false);
    };
    /**
     * Handler for submitting the confirmation modal
     * @author David Linhardt
     *
     * @param {ConfirmationModalData} data
     */
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
    /**
     * Handler for adding a user to the backend
     * @author David Linhardt
     *
     * @param {React.FormEvent<HTMLFormElement>} event
     */
    function handleAddUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        askForConfirmation(newUserEmail, Action.ADD, newUserAdmin);
    }
    /**
     * Handler for changing the email input field in the Add User Form
     * @author David Linhardt
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    function handleNewUserEmailChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setNewUserEmail(event.target.value);
        if (event.target.value.length === 0) {
            setErrorText('');
            setValid(false);
        } else if (!isValidEmail(event.target.value)) {
            setErrorText(t('errorInvalidEmail'));
            setValid(false);
        } else {
            setErrorText('');
            setValid(true);
        }
    }
    /**
     * Handler for changing the admin checkbox in the Add User Form
     * @author David Linhardt
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    function handleNewUserAdminChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setNewUserAdmin(event.target.checked);
    }

    return (
        <div className="center">
            <h1>{t('userTitle')}</h1>
            <div
                className="user-management-content"
                data-testid="user-management-content"
            >
                <div
                    className="ag-theme-quartz" // applying the grid theme
                    style={{ height: 594, width: 1000 }} // min height for 9 pages and no scrollbar
                    data-testid="users-table-container"
                >
                    <AgGridReact
                        key={JSON.stringify(gridLocale)}
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={colDefs}
                        gridOptions={gridOptions}
                        localeText={gridLocale}
                        data-testid="users-table"
                    />
                </div>
                <ConfirmationModal
                    isOpen={isConfirmationModalOpen}
                    onClose={handleCloseConfirmationModal}
                    onSubmit={handleSubmitConfirmationModal}
                    data={confirmationModalData}
                />
                <fieldset
                    className="form-fieldset"
                    data-testid="users-fieldset"
                >
                    <legend data-testid="users-legend">{t('addUser')}</legend>
                    <form onSubmit={handleAddUser} data-testid="add-user-form">
                        <div
                            className="form-container"
                            data-testid="add-user-form-container"
                        >
                            <div
                                className="form-email-section"
                                data-testid="add-user-form-email-section"
                            >
                                <ErrorComponent text={errorText} />
                                <input
                                    className="form-input-email input"
                                    name="email"
                                    type="email"
                                    value={newUserEmail}
                                    placeholder={t('tableHeaderEmail')}
                                    onChange={handleNewUserEmailChange}
                                    data-testid="add-user-email-input"
                                />
                            </div>
                            <div className="form-admin-section">
                                <label htmlFor="admin" className="label">
                                    {t('tableHeaderAdmin')}
                                </label>
                                <input
                                    checked={newUserAdmin}
                                    type="checkbox"
                                    id="admin"
                                    name="admin"
                                    onChange={handleNewUserAdminChange}
                                    className="checkbox"
                                />
                            </div>
                            <div
                                className="form-submit-section"
                                data-testid="add-user-form-submit-section"
                            >
                                <Button text={t('addUser')} disabled={!valid} />
                            </div>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}
