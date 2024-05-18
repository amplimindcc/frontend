import './LoaderPage.css';
import Loader from '../Loader/Loader';

const LoaderPage = () => {
    return (
        <div className="loader-page">
            <Loader height={32} width={32} borderWidth={5} />
        </div>
    );
};

export default LoaderPage;
