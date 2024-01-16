import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';
import store from "./store/store.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Notifications position="bottom-right"/>
        <App />
    </Provider>
);
