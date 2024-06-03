import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import i18n from '../i18n';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
