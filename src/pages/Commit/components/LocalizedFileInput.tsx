import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './LocalizedFileInput.css';

interface LocalizedFileInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string;
}


/**
 * Localized file input component to upload files with a localized button and text.
 * @author David Linhardt
 *
 * @param {{ onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; accept: string; }} param0
 * @param {event: React.ChangeEvent<HTMLInputElement>) => void} param0.onChange
 * @param {string} param0.accept
 * @returns {React.ReactNode}
 */
const LocalizedFileInput: React.FC<LocalizedFileInputProps> = ({ onChange, accept }) => {
    // Context
    /**
     * i18next Context
     * @author David Linhardt
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['userProject']);
    // States
    /**
     * fileName state to store the name of the file that was selected by the user.
     * @author David Linhardt
     *
     * @type {string}
     */
    const [fileName, setFileName] = useState<string>("");

    /**
     * Handler for the file input change event.
     * @author David Linhardt
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event
     */
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
        else {
            setFileName("");
        }
        onChange(event);
    };

    /**
     * Trigger the actual hidden file input element to open the file dialog.
     * @author David Linhardt
     */
    const triggerFileInputClick = () => {
        document.getElementById('fileInput')?.click();
    };

    return (
        <div>
            <input
                type='file'
                accept={accept}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                id='fileInput'
                name='filePath'
                data-testid="fileUpload"
            />
            <label htmlFor='fileInput' className='custom-file-input'>
                <button className="button" type="button" onClick={triggerFileInputClick}>
                    {t('browse')}
                </button>
            </label>
            <span className='localized-file-input-span'>{(fileName === "") ? t('noFileSelected') : (fileName)}</span>
        </div>
    );
};

export default LocalizedFileInput;