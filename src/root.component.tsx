import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import './root.styles.scss';
import App from './app';

export default function Root(): JSX.Element {
    return (
        <Router>
            <App />
        </Router>
    );
}
