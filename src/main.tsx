
import { createRoot } from 'react-dom/client';

import './index.css';
import React from 'react';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
    <App />
  </Provider>
  );
} else {
  console.error('Root element not found.');
}

