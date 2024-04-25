import Loader from '../Loader/Loader';

interface ButtonProps {
    text: string;
    disabled?: boolean;
    loading?: boolean;
    handleClick?: () => void;
}

const Button = ({text, disabled, loading, handleClick}: ButtonProps) => {
    return (
        <button type="submit" className="button" disabled={disabled} onClick={handleClick}>
            {
                loading ? (
                    <Loader height={12} width={12} borderWidth={2}/>
                ) : (
                    null
                )
            }
            {text}
        </button>
    )
}

export default Button;