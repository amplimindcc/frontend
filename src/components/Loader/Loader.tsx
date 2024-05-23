import './Loader.css';

/**
 * Props for the Loader component
 * @author Steven Burger
 *
 * @interface LoaderProps
 * @typedef {LoaderProps}
 */
interface LoaderProps {
    width: number;
    height: number;
    borderWidth: number;
}

/**
 * Spinner loader component to show a loading state
 * @author Steven Burger
 *
 * @param {LoaderProps} param0
 * @param {number} param0.width
 * @param {number} param0.height
 * @param {number} param0.borderWidth
 * @returns {React.ReactNode}
 */
const Loader = ({ width, height, borderWidth }: LoaderProps) => {
    const loaderStyle = {
        width,
        height,
        borderWidth: borderWidth,
    };

    return (
        <span
            className="loader"
            style={loaderStyle}
            data-testid="loader"
        ></span>
    );
};

export default Loader;
