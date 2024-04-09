import './Invite.css'
import { useParams } from 'react-router-dom';
import Register from './components/Register';

const Invite = () => {
    const params = useParams();
    const { token } = params;

    return (
        <div>
            Token: {token}
            <Register />
        </div>
    );
};

export default Invite;