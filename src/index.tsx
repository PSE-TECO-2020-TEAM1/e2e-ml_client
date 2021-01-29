import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import reportWebVitals from './reportWebVitals';

import API from 'lib/API';
import { APIProvider } from 'lib/hooks/API';

const entry = process.env.REACT_APP_ENTRYPOINT === 'mobile' ? './entrypoints/mobile/index.tsx' : './entrypoints/desktop/index.tsx';
import(`${entry}`).then(({ default: App }) => {
  ReactDOM.render(
    <React.StrictMode>
      <APIProvider value={new API()}>
        <App />
      </APIProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
