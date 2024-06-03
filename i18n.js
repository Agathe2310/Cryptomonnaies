import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    //Les traductions que je vais utiliser en anglais
    translation: {
      "welcome": "Welcome to my Crypto-Tracker :)",
      "search": "Search...",
      "price": "Price",
      "change24Hour": "24 Hour Change",
      "marketCap": "Market Cap",
      "loading": "Loading..."
    }
  },
  //La même chose mais en français
  fr: {
    translation: {
      "welcome": "Bienvenue sur mon tracker des cryptomonnaies :)",
      "search": "Recherche...",
      "price": "Prix",
      "change24Hour": "Changement sur 24 heures",
      "marketCap": "Capitalisation boursière",
      "loading": "Chargement..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // ce que je mets par défaut
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
