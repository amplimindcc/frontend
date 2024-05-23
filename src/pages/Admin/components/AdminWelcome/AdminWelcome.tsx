import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './AdminWelcome.css';
import user from '../../../../services/user';
import { ToastType } from '../../../../interfaces/ToastType';
import toast from '../../../../services/toast';
import Loader from '../../../../components/Loader/Loader';

/**
 * Description placeholder
 * @author Samuel Hertrich
 * @author David Linhardt
 *
 * @export
 * @returns {React.ReactNode}
 */
export default function AdminWelcome() {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['admin', 'main']);

    // States
    /**
     * Current users username
     * @author David Linhardt
     *
     * @type {string | null}
     */
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        let hasBeenExecuted = false;
        /**
         * Fetches the current user from the backend and sets the username state accordingly.
         * @author David Linhardt
         *
         * @async
         * @returns {void}
         */
        const fetchUser = async () => {
            try {
                const res = await user.authenticated();
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.email);
                } else {
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(
                            res.status,
                            t('notAuthenticated', { ns: 'main' })
                        )
                    );
                }
            } catch (e: unknown) {
                toast.showToast(
                    ToastType.ERROR,
                    t('connectionError', { ns: 'main' })
                );
            }
        };

        if (!hasBeenExecuted) {
            fetchUser();
        }
        return () => {
            hasBeenExecuted = true; // Cleanup
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="admin-welcome">
            <h1>
                {t('signedInText')}
                {username ? (
                    username
                ) : (
                    <Loader height={16} width={16} borderWidth={2} />
                )}
            </h1>
        </div>
    );
}
