import './Button.css'
import Loader from '../Loader/Loader';

interface ButtonProps {
    text: string;
    disabled?: boolean;
    loading?: boolean;
    handleClick?: () => void;
}

const Button = ({text, disabled=false, loading, handleClick}: ButtonProps) => {
    return (
        <button
            type="submit"
            className={disabled ? 'button-disabled' : 'button'}
            disabled={disabled}
            onClick={handleClick}
        >
            {
                loading ? (
                    <span className="loader-in-button">
                        <Loader height={12} width={12} borderWidth={2}/>
                    </span>
                ) : (
                    null
                )
            }
            {text}
        </button>
    )
}

export default Button;