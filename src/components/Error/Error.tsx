import './Error.css'

interface ErrorProps {
    text: string;
};

const Error = ({ text }: ErrorProps) => {
    return (
        <div className="error">
            {text}
        </div>
    )
};

export default Error;