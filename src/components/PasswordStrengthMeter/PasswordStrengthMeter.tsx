import { create } from 'domain';
import './PasswordStrengthMeter.css';
import zxcvbn from 'zxcvbn';
import { useTranslation } from 'react-i18next';

interface PasswordStrengthMeterProps {
    password: string;
}

const createPasswordLabel = (score: number): string => {
    const { t } = useTranslation('passwordStrength');

    switch (score) {
        case 0:
            return t('scoreWeak');
        case 1:
            return t('scoreWeak');
        case 2:
            return t('scoreFair');
        case 3:
            return t('scoreGood');
        case 4:
            return t('scoreStrong');
        default:
            return t('scoreWeak');
    }
};

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {

    const { t } = useTranslation('passwordStrength');
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
                    {t('pwStrengthText')}
                </strong>
                {createPasswordLabel(passwordStrength)}
            </div>
        </div>
    );
};

export default PasswordStrengthMeter;
