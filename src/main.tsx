import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {MeeksPediaApp} from './MeeksPediaApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeeksPediaApp />
  </StrictMode>
)
