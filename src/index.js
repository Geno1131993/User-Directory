import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';


console.log("From index.js");



ReactDOM.render(<App />, document.getElementById('app'));

serviceWorker.unregister();
