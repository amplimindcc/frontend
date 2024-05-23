import './LoaderPage.css';
import Loader from '../Loader/Loader';

/**
 * Shows a loader page with a spinner in the middle of the screen
 * @author Steven Burger
 *
 * @returns {React.ReactNode}
 */
const LoaderPage = () => {
    return (
        <div className="loader-page">
            <Loader height={32} width={32} borderWidth={5} />
        </div>
    );
};

export default LoaderPage;
