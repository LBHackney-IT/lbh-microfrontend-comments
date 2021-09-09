import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { useFeatureToggle } from '@mtfh/common';

import { AddCommentsToPersonView, AddCommentsToTenureView } from './views';
import { AddCommentFormLegacy } from './components';

export default function App(): JSX.Element {
    const refactorCommentsToggle = useFeatureToggle('MMH.RefactorComments');
    return (
        <Switch>
            <Route path="/comment/person/:id">
                {refactorCommentsToggle ? (
                    <AddCommentsToPersonView />
                ) : (
                    <AddCommentFormLegacy />
                )}
            </Route>
            {refactorCommentsToggle && (
                <Route path="/comment/tenure/:id">
                    <AddCommentsToTenureView />
                </Route>
            )}
            <Route>
                <div>404</div>
            </Route>
        </Switch>
    );
}
