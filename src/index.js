import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./redux/store";
import {Provider} from "react-redux";
import {SSRProvider} from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import {ProSidebarProvider} from 'react-pro-sidebar';
import "react-image-gallery/styles/css/image-gallery.css";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SSRProvider>
                <ProSidebarProvider>
                    <App/>
                </ProSidebarProvider>
            </SSRProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

