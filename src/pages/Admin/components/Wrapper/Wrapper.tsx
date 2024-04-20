import Navigation from './Navigation/Navigation';

export default function Layout({ children }: any) {
    return (
        <div className="layout">
            <Navigation />
            <div className="content">{children}</div>
        </div>
    );
}
