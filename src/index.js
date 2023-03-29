import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./Style/index.scss";
import App from "./App";

import RequestsMethodsProvider from "./hoc/RequestsMethods";

import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RequestsMethodsProvider>
                    <App />
                </RequestsMethodsProvider>
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
