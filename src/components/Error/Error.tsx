import './Error.css';

interface ErrorProps {
    text: string;
}

const Error = ({ text }: ErrorProps) => {
    if (text === null) {
        return null;
    }

    return <div className="error">{text}</div>;
};

export default Error;
