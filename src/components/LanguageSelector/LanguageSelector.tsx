import './LanguageSelector.css';
import Select, { SingleValue } from 'react-select';
import 'flag-icon-css/css/flag-icons.css';
import { useLocaleContext } from '../Context/LocaleContext/useLocaleContext';

/**
 * Interface for the LanguageOption
 * @author David Linhardt
 *
 * @interface LanguageOption
 * @typedef {LanguageOption}
 */
interface LanguageOption {
    value: string;
    label: JSX.Element;
}

/**
 * Options for the language selector dropdown
 * @author Matthias Roy
 *
 * @type {LanguageOption[]}
 */
const languageOptions: LanguageOption[] = [
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

/**
 * Language selector component to change the language of the application
 * @author Matthias Roy
 * @author David Linhardt
 *
 * @returns {React.ReactNode}
 */
const LanguageSelector = () => {
    const { locale, setLocale } = useLocaleContext();

    const changeLanguage = (selectedOption: SingleValue<LanguageOption>) => {
        if (selectedOption !== null) {
            setLocale(selectedOption.value);
        }
    };

    return (
        <div data-testid="language-selector">
            <Select
                options={languageOptions}
                defaultValue={languageOptions.find(
                    (element) => element.value === locale
                )}
                onChange={changeLanguage}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: '#002339', // Change the background color of the control
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        color: 'white', // Change the text color of the selected option
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: '#002339',
                        color: state.isSelected ? '#06f87f' : 'white', // Change the text color of the selected option
                        fontWeight: state.isSelected ? 'bold' : 'normal', // Change the font weight of the selected option
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: '#002339', // Change the background color of the dropdown
                    }),
                }}
            />
        </div>
    );
};

export default LanguageSelector;
