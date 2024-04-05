import './Invite.css'
import { useParams } from 'react-router-dom';

export default function Invite() {
    const params = useParams();
    const token = params.token;
    return (
        <div>
            Token: {token}
        </div>
    );
}