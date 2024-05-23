import './Button.css';
import Loader from '../Loader/Loader';

/**
 * Interface for the Button component props
 * @author Steven Burger
 *
 * @interface ButtonProps
 * @typedef {ButtonProps}
 */
interface ButtonProps {
    text: string;
    disabled?: boolean;
    loading?: boolean;
    handleClick?: () => void;
}

/**
 * Button component
 * @author Steven Burger
 *
 * @param {ButtonProps} param0
 * @param {string} param0.text
 * @param {boolean} [param0.disabled=false]
 * @param {boolean} param0.loading
 * @param {() => void} param0.handleClick
 * @returns {React.ReactNode}
 */
const Button = ({
    text,
    disabled = false,
    loading,
    handleClick,
}: ButtonProps) => {
    return (
        <button
            type="submit"
            className={disabled ? 'button-disabled' : 'button'}
            disabled={disabled}
            onClick={handleClick}
        >
            {loading ? (
                <span className="loader-in-button">
                    <Loader height={12} width={12} borderWidth={2} />
                </span>
            ) : null}
            {text}
        </button>
    );
};

export default Button;
