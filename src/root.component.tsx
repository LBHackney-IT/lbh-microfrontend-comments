import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { useFeatureToggle } from '@mtfh/common';
import './root.styles.scss';
import { AddCommentFormLegacy } from '@components';
import { AddCommentsView } from './views/add-comments-view';

export default function Root(): JSX.Element {
    const refactorCommentsToggle = useFeatureToggle('MMH.RefactorComments');
    return (
        <Router>
            <Switch>
                <Route path="/comment/:type/:id">
                    {refactorCommentsToggle ? (
                        <AddCommentsView />
                    ) : (
                        <AddCommentFormLegacy />
                    )}
                </Route>
                <Route path="*">// 404</Route>
            </Switch>
        </Router>
    );
}
