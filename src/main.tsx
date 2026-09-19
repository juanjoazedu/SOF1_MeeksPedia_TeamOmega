import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {MeeksPediaApp} from './MeeksPediaApp';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeeksPediaApp />
  </StrictMode>
)
