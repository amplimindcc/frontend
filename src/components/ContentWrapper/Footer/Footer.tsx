import './Footer.css';
import { useTranslation } from 'react-i18next';

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
                <a className="footer-link datenschutzerklaerung" href="">
                    GitHub
                </a>
            </div>
            <p data-testid="license-text">License Text</p>
        </div>
    );
}
