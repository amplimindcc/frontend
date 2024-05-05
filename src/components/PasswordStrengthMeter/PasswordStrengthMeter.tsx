import './PasswordStrengthMeter.css';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthMeterProps {
    password: string;
}

const createPasswordLabel = (score: number): string => {
    switch (score) {
        case 0:
            return 'Weak';
        case 1:
            return 'Weak';
        case 2:
            return 'Fair';
        case 3:
            return 'Good';
        case 4:
            return 'Strong';
        default:
            return 'Weak';
    }
};

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {

    const passwordStrength = zxcvbn(password).score;

    return (
        <div className='password-strength-meter'>
            <progress
                className="password-strength-meter-progress"
                value={passwordStrength}
                max="4"
            />
            <div>
                <strong>
                    {"Password strength: "}
                </strong>
                {createPasswordLabel(passwordStrength)}
            </div>
        </div>
    );
};

export default PasswordStrengthMeter;
