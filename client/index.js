import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App.jsx';
import styles from './styles/application.scss'

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(

    <React.StrictMode>
        <App />
    </React.StrictMode>

)
