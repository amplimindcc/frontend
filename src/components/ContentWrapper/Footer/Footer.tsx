import './Footer.css';

export default function Footer() {
    return (
        <div className="footer background-dark-blue">
            <div className="footer-link-container">
                <a
                    className="footer-link"
                    href="https://amplimind.io/impressum/"
                >
                    Impressum
                </a>

                <a
                    className="footer-link footer-link-middle"
                    href="https://amplimind.io/"
                >
                    amplimind
                </a>
                <a
                    className="footer-link"
                    href="https://github.com/amplimindcc"
                >
                    GitHub
                </a>
            </div>
            <p>License Text</p>
        </div>
    );
}
