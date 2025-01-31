import { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const projects = [
  {
    title: 'Note Calculator',
    description: 'Calcul de "notes"',
    path: '/note-calculator',
    color: '#FF6B6B',
    icon: '👨‍💻',
    visible: true  // Add visible property
  },
  {
    title: 'app2',
    description: 'Tech articles and thoughts',
    path: '/blog',
    color: '#4ECDC4',
    icon: '✍️',
    visible: false
  },
  {
    title: 'app3',
    description: 'Open source contributions',
    path: '/projects',
    color: '#45B7D1',
    icon: '🚀',
    visible: false
  },
  {
    title: 'Contact',
    description: 'Get in touch with me',
    path: '/contact',
    color: '#96CEB4',
    icon: '📫',
    visible: false
  }
];

function App() {
  return (
    <div className="app-container">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>3l0u4nn</h1>
        <p className="subtitle">🎼🎵🎷🎸🎹🎶</p>
      </motion.header>

      <motion.div 
        className="projects-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {projects.filter(project => project.visible).map((project, index) => (
          <motion.div
            key={project.title}
            className="project-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => window.location.href = project.path}
          >
            <span className="project-icon">{project.icon}</span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default App;
