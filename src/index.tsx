import React from 'react';
import ReactDOM from 'react-dom';
import 'styling/index.scss';
// import reportWebVitals from './reportWebVitals';

import API from 'lib/API';
import { APIProvider } from 'lib/hooks/API';
import App from 'App';
import { log } from 'lib/utils';

window.onunhandledrejection = function(e: PromiseRejectionEvent) {
    log.error('Catched global rejection: ', e);
};

ReactDOM.render(
    <React.Fragment>
        <APIProvider value={new API()}>
            <App />
        </APIProvider>
    </React.Fragment>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
