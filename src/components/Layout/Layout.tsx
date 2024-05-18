import './Layout.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout background-light-blue">
            <div className="content">{children}</div>
        </div>
    );
};

export default Layout;
