import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { hasToggle } from '@mtfh/common';
import './root.styles.scss';
import { AddCommentFormLegacy } from '@components';

export default function Root(): JSX.Element {
    const refactorCommentsToggle = hasToggle('MMH.RefactorComments');
    return (
        <Router>
            <Switch>
                <Route path="/comment/:type/:id">
                    {refactorCommentsToggle ? (
                        <h1>placeholder</h1>
                    ) : (
                        <AddCommentFormLegacy />
                    )}
                </Route>
                <Route path="*">// 404</Route>
            </Switch>
        </Router>
    );
}
