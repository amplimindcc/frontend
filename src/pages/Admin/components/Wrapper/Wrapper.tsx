import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';

export default function Layout({ children }: any) {
    return (
        <div className="layout">
            <Navigation />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}
