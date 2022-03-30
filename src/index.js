import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../src/Redux/store/store'
import { Auth0Provider } from '@auth0/auth0-react';
import dotenv from 'dotenv';

dotenv.config();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render( 
  <React.StrictMode>
    <BrowserRouter>
    <Provider store = {store}>
      <Auth0Provider
      domain = {domain}
      clientId = {clientId}
      redirectUri={window.location.origin}
      >
    <App />
    </Auth0Provider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
>>>>>>> 042b9696ff9d5397a5e51f6b502f6dda96af117e
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
