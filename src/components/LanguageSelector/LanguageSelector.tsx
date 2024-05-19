import './LanguageSelector.css';
import Select from 'react-select';
import 'flag-icon-css/css/flag-icons.css';
import { useLocaleContext } from '../useLocaleContext';

const languageOptions = [
    {
        value: 'en',
        label: (
            <div>
                <span className="flag-icon flag-icon-us"></span> English
            </div>
        ),
    },
    {
        value: 'de',
        label: (
            <div>
                <span className="flag-icon flag-icon-de"></span> Deutsch
            </div>
        ),
    },
];

const LanguageSelector = () => {
    const { locale, setLocale } = useLocaleContext();

    const changeLanguage = (language: any) => {
        setLocale(language.value);
    };

    return (
        <div>
            <Select
                options={languageOptions}
                defaultValue={languageOptions.find(
                    (element) => element.value === locale
                )}
                onChange={changeLanguage}
            />
        </div>
    );
};

export default LanguageSelector;
