import { useEffect, useState } from 'react';
import './AdminWelcome.css';
import user from '../../../../services/user';
import { ToastType } from '../../../../interfaces/ToastType';
import toast from '../../../../services/toast';
import Loader from '../../../../components/Loader/Loader';

export default function AdminWelcome() {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        let hasBeenExecuted = false;
        const fetchUser = async () => {
            try {
                const res = await user.authenticated();
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.email);
                } else {
                    toast.showToast(
                        ToastType.ERROR,
                        toast.httpError(res.status, 'Not authenticated')
                    );
                }
            } catch (e: any) {
                toast.showToast(
                    ToastType.ERROR,
                    'Connection error. Try again later.'
                );
            }
        };

        if (!hasBeenExecuted) {
            fetchUser();
        }
        return () => {
            hasBeenExecuted = true; // Cleanup
        };
    }, []);

    return (
        <div className="admin-welcome">
            <h1>
                Du bist angemeldet als:{' '}
                {username ? (
                    username
                ) : (
                    <Loader height={16} width={16} borderWidth={2} />
                )}
            </h1>
        </div>
    );
}
