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
import { useAGGridLocaleContext } from '../../../../components/useAGGridLocaleContext';

export default function Users() {
    const { t } = useTranslation(['admin', 'main']);
    const { gridLocale } = useAGGridLocaleContext();

    // Create a gridRef (for GridAPI)
    const gridRef: LegacyRef<AgGridReact> = useRef<AgGridReact>(null);

    // Add-User-Form States
    const [newUserAdmin, setNewUserAdmin] = useState<boolean>(false);
    const [newUserEmail, setNewUserEmail] = useState<string>('');
    const [errorText, setErrorText] = useState<string>('');
    const [valid, setValid] = useState<boolean>(false);

    // Confirmation-Modal States
    const [isConfirmationModalOpen, setConfirmationModalOpen] =
        useState<boolean>(false);
    const [confirmationModalData, setConfirmationModalData] =
        useState<ConfirmationModalData>({
            action: Action.DELETE,
            email: '',
            admin: false,
        });

    // Grid Options
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

    // Row Data
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

    interface JsonUserItem {
        email: string;
        status: string;
        isAdmin: boolean;
        canBeReinvited: boolean;
        inviteTokenExpiration: string;
    }

    // Column Definitions
    const [colDefs, setColDefs] = useState<ColDef<UsersTableElement>[]>([]);
    useEffect(() => {
        // Cell Renderers (Custom Component Renderers)
        interface ButtonRendererParams {
            label: string;
            data: UsersTableElement;
        }
        const deleteButtonRenderer = (params: ButtonRendererParams) => (
            <Button
                text={params.label}
                handleClick={() =>
                    askForConfirmation(params.data.email, Action.DELETE)
                }
            />
        );
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
    }; // render Popover to ask for confirmation
    function isValidEmail(email: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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
    function handleNewUserAdminChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setNewUserAdmin(event.target.checked);
    }

    return (
        <div className="center">
            <h1>{t('userTitle')}</h1>
            <div className="user-management-content">
                <div
                    className="ag-theme-quartz" // applying the grid theme
                    style={{ height: 594, width: 1000 }} // min height for 9 pages and no scrollbar
                >
                    <AgGridReact
                        key={JSON.stringify(gridLocale)}
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={colDefs}
                        gridOptions={gridOptions}
                        localeText={gridLocale}
                    />
                </div>
                <ConfirmationModal
                    isOpen={isConfirmationModalOpen}
                    onClose={handleCloseConfirmationModal}
                    onSubmit={handleSubmitConfirmationModal}
                    data={confirmationModalData}
                />
                <fieldset className="form-fieldset">
                    <legend>{t('addUser')}</legend>
                    <form onSubmit={handleAddUser}>
                        <div className="form-container">
                            <div className="form-email-section">
                                <ErrorComponent text={errorText} />
                                <input
                                    className="form-input-email input"
                                    name="email"
                                    type="email"
                                    value={newUserEmail}
                                    placeholder={t('tableHeaderEmail')}
                                    onChange={handleNewUserEmailChange}
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
                            <div className="form-submit-section">
                                <Button text={t('addUser')} disabled={!valid} />
                            </div>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}
