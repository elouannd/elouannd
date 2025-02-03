import { useState } from 'react'
import styles from './note-calculator.module.css'

function NoteCalculator() {
  const translations = {
    EN: {
      title: 'Note Calculator',
      freqDiff: 'Frequency Difference',
      octaveDiff: 'Octave Difference',
      semitones: 'Semitones',
      tones: 'Tones',
    },
    FR: {
      title: 'Calculateur de Notes',
      freqDiff: 'Différence de fréquence',
      octaveDiff: 'Différence d’octave',
      semitones: 'Demi-tons',
      tones: 'Tons',
    }
  }

  const [language, setLanguage] = useState('EN')
  const [baseNote, setBaseNote] = useState('A')
  const [baseOctave, setBaseOctave] = useState(4)
  const [compareNote, setCompareNote] = useState('A')
  const [compareOctave, setCompareOctave] = useState(4)
  const [noteSystem, setNoteSystem] = useState('EN')
  const [highContrast, setHighContrast] = useState(false)

  const solfegeMap = {
    A: 'La',
    'A#': 'La#',
    B: 'Si',
    C: 'Do',
    'C#': 'Do#',
    D: 'Ré',
    'D#': 'Ré#',
    E: 'Mi',
    F: 'Fa',
    'F#': 'Fa#',
    G: 'Sol',
    'G#': 'Sol#'
  }

  const getDisplayedName = (note) => {
    if (noteSystem === 'SOL') {
      return solfegeMap[note.name] || note.name
    }
    return note.name
  }

  // Core data structure for musical notes
  const notes = [
    { name: 'A', frequency: 440 },
    { name: 'A#', frequency: 466.16 },
    { name: 'B', frequency: 493.88 },
    { name: 'C', frequency: 523.25 },
    { name: 'C#', frequency: 554.37 },
    { name: 'D', frequency: 587.33 },
    { name: 'D#', frequency: 622.25 },
    { name: 'E', frequency: 659.25 },
    { name: 'F', frequency: 698.46 },
    { name: 'F#', frequency: 739.99 },
    { name: 'G', frequency: 783.99 },
    { name: 'G#', frequency: 830.61 }
  ]

  // Core calculation functions
  const getFrequency = (noteName, octave) => {
    const found = notes.find(n => n.name === noteName)
    if (!found) return 0
    return found.frequency * Math.pow(2, octave - 4)
  }

  const calculateSemitones = (freq1, freq2) => {
    return Math.round(12 * Math.log2(freq2 / freq1))
  }

  const calculateOctaveDifference = (freq1, freq2) => {
    return Math.log2(freq1 / freq2)
  }

  const formatFrequency = (freq) => {
    return freq >= 1000 ? `${(freq/1000).toFixed(2)} kHz` : `${freq.toFixed(2)} Hz`
  }

  // Calculate results
  const baseFrequency = getFrequency(baseNote, baseOctave)
  const compareFrequency = getFrequency(compareNote, compareOctave)
  const frequencyDifference = Math.abs(baseFrequency - compareFrequency)
  const octaveDifference = Math.abs(calculateOctaveDifference(baseFrequency, compareFrequency))
  const semitones = Math.abs(calculateSemitones(baseFrequency, compareFrequency))
  const tones = semitones / 2

  return (
    <div className={`${styles['calculator-container']} ${highContrast ? styles['high-contrast'] : ''}`}>
      <div className={styles['language-selector']}>
        <button
          className={`${styles['language-button']} ${language === 'EN' ? styles['active'] : ''}`}
          onClick={() => setLanguage('EN')}
        >
          ENG
        </button>
        <button
          className={`${styles['language-button']} ${language === 'FR' ? styles['active'] : ''}`}
          onClick={() => setLanguage('FR')}
        >
          FR
        </button>
      </div>
      <div className={styles['accessibility-controls']}>
        <button
          className={`${styles['accessibility-button']} ${highContrast ? styles['active'] : ''}`}
          onClick={() => setHighContrast(!highContrast)}
          aria-label="Toggle high contrast mode"
        >
          <span role="img" aria-hidden="true">🌓</span>
        </button>
      </div>
      <div className={styles['calculator-content']}>
        <h1>{translations[language].title}</h1>
        <div className={styles['note-system-selector']}>
          <button
            className={`${styles['language-button']} ${noteSystem === 'EN' ? styles['active'] : ''}`}
            onClick={() => setNoteSystem('EN')}
          >
            EN
          </button>
          <button
            className={`${styles['language-button']} ${noteSystem === 'SOL' ? styles['active'] : ''}`}
            onClick={() => setNoteSystem('SOL')}
          >
            SOLF
          </button>
        </div>
        <div className={styles['input-group']}>
          <select value={baseNote} onChange={e => setBaseNote(e.target.value)}>
            {notes.map(n => (
              <option key={n.name} value={n.name}>
                {getDisplayedName(n)}
              </option>
            ))}
          </select>
          <label>Base Octave:</label>
          <input
            type="range"
            min="0"
            max="8"
            value={baseOctave}
            onChange={(e) => setBaseOctave(e.target.value)}
          />
          <input
            type="number"
            pattern="[0-9]*"
            inputMode="numeric"
            value={baseOctave}
            onChange={(e) => setBaseOctave(e.target.value)}
          />
          <p>{formatFrequency(baseFrequency)}</p>
        </div>

        <div className={styles['input-group']}>
          <select value={compareNote} onChange={e => setCompareNote(e.target.value)}>
            {notes.map(n => (
              <option key={n.name} value={n.name}>
                {getDisplayedName(n)}
              </option>
            ))}
          </select>
          <label>Compare Octave:</label>
          <input
            type="range"
            min="0"
            max="8"
            value={compareOctave}
            onChange={(e) => setCompareOctave(parseInt(e.target.value))}
          />
          <input
            type="number"
            pattern="[0-9]*"
            inputMode="numeric"
            min="0"
            max="8"
            value={compareOctave}
            onChange={e => setCompareOctave(parseInt(e.target.value))}
          />
          <p>{formatFrequency(compareFrequency)}</p>
        </div>

        <div className={styles.results}>
          <p>{translations[language].freqDiff}: {frequencyDifference.toFixed(2)} Hz</p>
          <p>{translations[language].octaveDiff}: {octaveDifference.toFixed(2)}</p>
          <p>{translations[language].semitones}: {semitones}</p>
          <p>{translations[language].tones}: {tones.toFixed(1)}</p>
        </div>
        <div className={styles.footer}>
          <p>Fait par Elouann 2025. <a href="mailto:eloudom@icloud.com">Contact</a></p>
        </div>
      </div>
    </div>
  )
}

export default NoteCalculator