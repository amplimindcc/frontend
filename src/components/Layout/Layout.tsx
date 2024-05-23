import './Layout.css';

/**
 * Adds a layout to the children
 * @author David Linhardt
 * @author Steven Burger
 *
 * @param {{ children: React.ReactNode }} param0
 * @param {React.ReactNode} param0.children
 * @returns {React.ReactNode}
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout background-light-blue">
            <div className="content">{children}</div>
        </div>
    );
};

export default Layout;
