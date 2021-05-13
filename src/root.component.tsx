import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import './root.styles.scss';
import { AddCommentForm } from '@components';

export default function Root(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/comment/:type/:id">
                    <AddCommentForm />
                </Route>
                <Route path="*">// 404</Route>
            </Switch>
        </Router>
    );
}
