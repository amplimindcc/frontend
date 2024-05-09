import "./LanguageSelector.css"
import Select from 'react-select';
import { useTranslation } from "react-i18next";
import 'flag-icon-css/css/flag-icons.css';

const languageOptions = [
  { value: 'en', label: (<div><span className="flag-icon flag-icon-us"></span> English</div>) },
  { value: 'de', label: (<div><span className="flag-icon flag-icon-de"></span> Deutsch</div>) },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: any) => {
    i18n.changeLanguage(language.value);
  };

  return (
    <div>
        <Select options={languageOptions} defaultValue={languageOptions[0]} onChange={changeLanguage} />
    </div>
  );
};

export default LanguageSelector;
