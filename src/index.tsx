import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

fetch('/data/data.json')
  .then(res => res.json())
  .then((appData) => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
      .render(
        <React.StrictMode>
          <App appData={appData} />
        </React.StrictMode>
      );
  });