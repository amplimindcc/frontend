import './Error.css';

/**
 * Interface for the Error component props
 * @author Steven Burger
 *
 * @interface ErrorProps
 * @typedef {ErrorProps}
 */
interface ErrorProps {
    text: string;
}

/**
 * Error component to show an error message to the user if something went wrong
 * @author Steven Burger
 *
 * @param {ErrorProps} param0
 * @param {string} param0.text
 * @returns {React.ReactNode}
 */
const Error = ({ text }: ErrorProps) => {
    if (text === null) {
        return null;
    }

    return <div className="error">{text}</div>;
};

export default Error;
