import './Footer.css';

export default function Footer() {
    return (
        <div className="footer background-dark-blue">
            <a href="https://amplimind.io/impressum/">Impressum</a>
            <div className="amplimind">
                <a href="https://amplimind.io/">amplimind</a>
            </div>
            <div className='github'>
                <a href="https://github.com/amplimindcc">GitHub</a>
            </div>
            <p>License Text</p>
        </div>
    );
}