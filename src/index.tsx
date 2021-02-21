import React from 'react';
import ReactDOM from 'react-dom';
import 'styling/index.scss';
// import reportWebVitals from './reportWebVitals';

import API from 'lib/API';
import { APIProvider } from 'lib/hooks/API';
import App from 'App';

ReactDOM.render(
    <React.StrictMode>
        <APIProvider value={new API()}>
            <App />
        </APIProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
