import Layout from '../../../../components/ContentWrapper/ContentWrapper';
import './AdminWelcome.css';

export default function AdminWelcome() {
    const adminUsername = () => {
        // TODO: get admin username from backend
        return 'maz123123';
    };

    return (
        <Layout>
            <div className="admin-welcome">
                Du bist angemeldet als: {adminUsername()}
            </div>
        </Layout>
    );
}
