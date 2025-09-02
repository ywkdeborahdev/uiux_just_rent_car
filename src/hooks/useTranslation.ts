import en from '../locales/en.json';
import zh from '../locales/zh.json';

// Define a type for our language files for better type safety
type Translations = typeof en;

const translations: { [key: string]: Translations } = {
    English: en,
    Chinese: zh,
};

export const useTranslation = (language: string) => {
    // A function 't' that takes a key and returns the translated string
    const t = (key: string): string => {
        const langFile = translations[language] || en; // Default to English if language not found

        // Simple key lookup (e.g., "header.carRental")
        // For nested keys, you could add more complex logic here if needed
        const keys = key.split('.');
        let result: any = langFile;
        for (const k of keys) {
            result = result[k];
            if (!result) {
                return key; // Return the key itself if not found
            }
        }
        return result;
    };

    return { t };
};