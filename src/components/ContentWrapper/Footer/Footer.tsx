import './Footer.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * Footer component that displays the footer of the application.
 * @author David Linhardt
 *
 * @export
 * @returns {React.ReactNode}
 */
export default function Footer() {
    /**
     * i18next Context
     * @author David Linhardt
     *
     * @type {TFunction<"main", undefined>}
     */
    const { t } = useTranslation('main');
    return (
        <div className="footer background-dark-blue">
            <div className="footer-link-container">
                <a
                    className="footer-link"
                    href="https://amplimind.io/impressum/"
                >
                    {t('footerImprint')}
                </a>
                <a className="footer-link" href="https://amplimind.io/">
                    amplimind
                </a>
                <a
                    className="footer-link"
                    href="https://github.com/amplimindcc"
                >
                    GitHub
                </a>
                <Link to="/privacy-policy" className="footer-link datenschutzerklaerung">
                    {t('privacyPolicy', {ns: "privacyPolicy"})}
                </Link>
            </div>
            <p data-testid="license-text">{t('licenseText', {ns: "license"})}</p>
        </div>
    );
}
