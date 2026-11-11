import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import CinematicExperience from './components/CinematicExperience.jsx';
import './styles/global.css';
import './styles/exhibits.css';
import './styles/refinement.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><HashRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}><CinematicExperience><App /></CinematicExperience></HashRouter></React.StrictMode>);

import './styles/red-edition.css';
import './styles/exhibit-v2.css';

import './styles/exhibit-polish.css';
import './styles/cinematic.css';
