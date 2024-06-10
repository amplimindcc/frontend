import './PrivacyPolicy.css';
import { useTranslation } from 'react-i18next';

/**
 * Privacy Policy component to display the privacy policy of the application.
 * @author David Linhardt
 *
 * @export
 * @returns {React.ReactNode}
 */
export default function PrivacyPolicy() {
    // Context
    /**
     * i18next Context
     * @author David Linhardt
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation('privacyPolicy');

    return (
        <div className="privacy-policy-container">
            <h1>{t('privacyPolicy')}</h1>
            your content here
        </div>
    );
}