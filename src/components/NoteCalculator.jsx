import React, { useState } from 'react';

const translations = {
  en: {
    title: "Grade Calculator",
    weight: "Weight",
    grade: "Grade",
    calculate: "Calculate",
    average: "Average:",
    totalWeight: "Total Weight:",
  },
  fr: {
    title: "Calculateur de Notes",
    weight: "Coefficient",
    grade: "Note",
    calculate: "Calculer",
    average: "Moyenne:",
    totalWeight: "Coefficient Total:",
  }
};

const LanguageSelector = ({ currentLang, onLanguageChange }) => {
  return (
    <div className={styles['language-selector']}>
      <button 
        className={`${styles['language-button']} ${currentLang === 'en' ? styles.active : ''}`}
        onClick={() => onLanguageChange('en')}
      >
        ENG
      </button>
      <button 
        className={`${styles['language-button']} ${currentLang === 'fr' ? styles.active : ''}`}
        onClick={() => onLanguageChange('fr')}
      >
        FR
      </button>
    </div>
  );
};

const MainComponent = () => {
  const [language, setLanguage] = useState('en');

  return (
    <div className={styles['calculator-container']}>
      <LanguageSelector 
        currentLang={language} 
        onLanguageChange={setLanguage} 
      />
      {/* ...rest of your component */}
    </div>
  );
};