import Navigation from './Navigation/Navigation';
import Layout from '../Layout/Layout';
import Footer from './Footer/Footer';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useAuthenticatedContext } from '../Context/AuthenticatedContext/useAuthenticatedContext';

/**
 * Content Wrapper that checks if the user is authenticated and shows the navigation, layout and footer accordingly.
 * @author Steven Burger
 * @author Samuel Hertrich
 *
 * @export
 * @param {{
 *     children: React.ReactNode;
 * }} param0
 * @param {React.ReactNode} param0.children
 * @returns {React.ReactNode}
 */
export default function ContentWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { authenticated } = useAuthenticatedContext();

    if (authenticated === null) {
        return <LoaderPage />;
    }

    return (
        <>
            {authenticated && <Navigation />}
            <Layout>{children}</Layout>
            <Footer />
        </>
    );
}
