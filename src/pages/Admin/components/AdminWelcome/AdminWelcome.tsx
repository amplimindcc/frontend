import { useTranslation } from 'react-i18next';
import './AdminWelcome.css';

export default function AdminWelcome() {
    const { t } = useTranslation('admin');

    const adminUsername = () => {
        // TODO: get admin username from backend
        return 'maz123123';
    };

    return (
        <div className="admin-welcome">
            {t('signedInText') + adminUsername()}
        </div>
    );
}
