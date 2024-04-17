import './AdminWelcome.css';

export default function AdminWelcome() {
    const adminUsername = () => {
        // TODO: get admin username from backend
        return 'maz123123';
    };

    return <div className="admin-welcome">Du bist angemeldet als: { adminUsername() }</div>;
}
