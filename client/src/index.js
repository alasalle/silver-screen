import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "core-js";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import MetaTags from "react-meta-tags";

import Reducer from "./_reducers";
import { Provider as ReduxProvider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Auth0Provider
    domain="silver-screen.us.auth0.com"
    clientId="Y1H30Yb8e0q70ib3pu9Id8E9Alf7gLjD"
    redirectUri={window.location.origin}
    audience="https://silver-screen.herokuapp.com/"
  >
    <ReduxProvider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <BrowserRouter>
        <MetaTags>
          <meta
            name="description"
            content="Silver Screen is a movie database hobby web app created by Angela La Salle."
          />
          <meta property="og:title" content="Silver Screen" />
          <meta property="og:image" content="./assets/logo_transparent.png" />
        </MetaTags>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </Auth0Provider>,

  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
