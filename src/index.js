import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./redux/store";
import {Provider} from "react-redux";
import {SSRProvider} from "react-bootstrap";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SSRProvider>
                <App/>
            </SSRProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

