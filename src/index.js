/* ==========================================================================
** Custom QnA Maker V2
** 28/08/2019
** Alan Medina Silva
** ========================================================================== */

 // --------------------------------------
 // Internet Explorer Compatibility
 // --------------------------------------
    // import 'core-js/es6/map';
    // import 'core-js/es6/set';
    // import 'raf/polyfill';
    // import 'es6-promise'
    
    // import "babel-polyfill";
    // import 'core-js/es6/map';
    // import 'core-js/es6/set';
    // import 'raf/polyfill';
 

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';




// --------------------------------------
// Render Application
// --------------------------------------
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
