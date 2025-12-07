import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

let dataUrl:string = '/data/data.json';
if(process.env.NODE_ENV === 'production'){
  dataUrl = './../data/data.json'
}
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