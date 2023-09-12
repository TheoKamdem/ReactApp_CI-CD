import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Importez BrowserRouter

import App from './App';

test('renders learn react link', () => {
  render(
    <Router> {/* Enveloppez votre composant App avec Router */}
      <App />
    </Router>
  );
});