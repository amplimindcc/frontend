import './Notification.css'

interface NotificationProps {
    text: string | null;
    timeout: number;
};

const Notification = ({ text }: NotificationProps) => {
    if(text === null) {
        return null;
    }

    return(
        <div className="notification">
            <div className="notification-box">
                {text}
            </div>
        </div>
    )
};

export default Notification;