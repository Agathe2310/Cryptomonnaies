import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/home.module.css';


export default function Home() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptos, setCryptos] = useState([]); //Mon tableau de cyrptos
  const [error, setError] = useState(null); //Pour mes erreurs

  // Ma clé d'api que je laisse ici exceptionnellement juste pour cet exercice (j'utilise l'api de CryptoCompare), 
  const apiKey = 'd6feef65927568c4058a3ded90bcce23ab48ff94cff8cd759f20e503b7a23ff9';

  useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull', {
      params: {
        limit: 100,
        tsym: 'USD',
        api_key: apiKey
      }
    }).then(reponse => {
      // Je vérifie si les données existent et contiennent une propriété 'Data'
      if (reponse.data && reponse.data.Data) {
        const infosCryptos = reponse.data.Data.map(monnaie => ({
          id: monnaie.CoinInfo.Id,
          name: monnaie.CoinInfo.FullName,
          symbole: monnaie.CoinInfo.Name, //Le symbole est ce qui va permettre de récupérer les informations de la crypto par la suite, c'est son "id" pour l'appel à l'api. Exemple : pour le détail du bitcoin, il faut prendre 'BTC' et non pas son id 
          currentPrice: monnaie.RAW?.USD?.PRICE || 0, // Prix actuel de la cryptomonnaie en USD
          change: monnaie.RAW?.USD?.CHANGE24HOUR || 0 // Changement du prix sur 24 heures de la crypto
        }));
        setCryptos(infosCryptos);
        setError(null);
      } else {
        setError('Structure de données invalide provenant de l\'API');
      }
    })
      .catch(error => {
        setError(`Erreur : ${error.message}. Veuillez réessayer plus tard.`);
      });
  }, []);

  // Fonction pour gérer la recherche des cryptos
  const search = (e) => {
    setSearchTerm(e.target.value); // je mets à jour le terme de recherche avec la valeur entrée
  };
  // Fonction pour changer la langue de l'application
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  // Filtrage des cryptomonnaies en fonction du terme de recherche
  const filterCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className={styles.container}>
      <div className={styles.languages}>
        <button onClick={() => changeLanguage('en')}>
          <img src="/drapeaux/uk.png" alt="English" />
        </button>
        <button onClick={() => changeLanguage('fr')}>
          <img src="/drapeaux/fr.png" alt="Français" />
        </button>
      </div>
      <h1>{t('welcome')}</h1>
      <input type="text" placeholder={t('search')} value={searchTerm}
        onChange={search}
        className={styles.searchInput}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className={styles.cryptosList}>
        {filterCryptos.map(crypto => (
          <Link key={crypto.id} href={`/detail/${crypto.symbole}`} passHref>
              <li className={styles.crypto}>
                {crypto.change >= 0 ? ( 
                  <>
                    <p className={styles.p}>{crypto.name} - </p>
                    <p className={styles.up}>${crypto.currentPrice.toFixed(2)}  ↑</p>
                  </>
                ) : (
                  <>
                    <p className={styles.p}>{crypto.name} - </p>
                    <p className={styles.down}>${crypto.currentPrice.toFixed(2)} ↓</p>
                  </>
                )}
              </li>
          </Link>
        ))}  
      </ul>
    </div>
  );
}
