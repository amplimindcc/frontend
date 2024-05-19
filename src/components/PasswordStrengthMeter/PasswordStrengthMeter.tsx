import './PasswordStrengthMeter.css';
import zxcvbn from 'zxcvbn';
import { useTranslation } from 'react-i18next';

interface PasswordStrengthMeterProps {
    password: string;
}

const createPasswordLabel = (score: number): string => {
    switch (score) {
        case 0:
            return 'scoreWeak';
        case 1:
            return 'scoreWeak';
        case 2:
            return 'scoreFair';
        case 3:
            return 'scoreGood';
        case 4:
            return 'scoreStrong';
        default:
            return 'scoreWeak';
    }
};

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
    password,
}) => {
    const { t } = useTranslation('passwordStrength');
    const passwordStrength = zxcvbn(password).score;

    return (
        <div className="password-strength-meter">
            <progress
                className="password-strength-meter-progress"
                value={passwordStrength}
                max="4"
            />
            <div>
                <strong>{t('pwStrengthText')}</strong>
                {t(createPasswordLabel(passwordStrength))}
            </div>
        </div>
    );
};

export default PasswordStrengthMeter;
