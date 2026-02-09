import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const dataUrl: string = new URL('./data/data.json', window.location.href).toString();

fetch(dataUrl)
  .then(res => res.json())
  .then((appData) => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
      .render(
        <React.StrictMode>
          <App appData={appData} />
        </React.StrictMode>
      );
  });
