import styles from './note-calculator.module.css';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  EN: {
    title: 'Grade Calculator',
    calculate: 'Calculate',
    result: 'Result',
    // Add other translations as needed
  },
  FR: {
    title: 'Calculateur de Notes',
    calculate: 'Calculer',
    result: 'Résultat',
    // Add other translations as needed
  }
};

export const NoteCalculator: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles['calculator-container']}>
      <div className={styles['language-selector']}>
        <button 
          className={`${styles['language-button']} ${language === 'EN' ? styles['active'] : ''}`}
          onClick={() => setLanguage('EN')}
        >
          EN
        </button>
        <button 
          className={`${styles['language-button']} ${language === 'FR' ? styles['active'] : ''}`}
          onClick={() => setLanguage('FR')}
        >
          FR
        </button>
      </div>
      <div className={styles['calculator-content']}>
        <h1>{translations[language].title}</h1>
        {/* Rest of your calculator content using translations[language].xxx */}
      </div>
    </div>
  );
};