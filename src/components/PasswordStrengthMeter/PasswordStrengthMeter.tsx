import './PasswordStrengthMeter.css';
import zxcvbn from 'zxcvbn';
import { useTranslation } from 'react-i18next';

/**
 * Interface for the PasswordStrengthMeter props
 * @author David Linhardt
 *
 * @interface PasswordStrengthMeterProps
 * @typedef {PasswordStrengthMeterProps}
 */
interface PasswordStrengthMeterProps {
    password: string;
}

/**
 * Create a label for the password strength based on the score
 * @author David Linhardt
 *
 * @param {number} score
 * @returns {string}
 */
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

/**
 * Password strength meter component to show the strength of a password based on the zxcvbn score
 * @author David Linhardt
 *
 * @param {{ password: string; }} param0
 * @param {string} param0.password
 * @returns {React.ReactNode}
 */
const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
    password,
}) => {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<"passwordStrength", undefined>}
     */
    const { t } = useTranslation('passwordStrength');

    /**
     * Password strength based on the zxcvbn score
     * @author David Linhardt
     *
     * @type {zxcvbn.ZXCVBNScore}
     */
    const passwordStrength: zxcvbn.ZXCVBNScore = zxcvbn(password).score;

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
