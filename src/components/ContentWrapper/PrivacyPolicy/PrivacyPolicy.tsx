import './PrivacyPolicy.css';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
    const { t } = useTranslation('privacyPolicy');
    return (
        <div className="privacy-policy-container">
            <h1>{t('privacyPolicy')}</h1>
            your content here
        </div>
    );
}