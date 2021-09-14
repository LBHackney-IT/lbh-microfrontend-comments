import { Route, Switch } from 'react-router-dom';
import React from 'react';

import { AddCommentsToPersonView, AddCommentsToTenureView } from './views';

export default function App(): JSX.Element {
    return (
        <Switch>
            <Route path="/comment/person/:id">
                <AddCommentsToPersonView />
            </Route>
            <Route path="/comment/tenure/:id">
                <AddCommentsToTenureView />
            </Route>
            <Route>
                <div>404</div>
            </Route>
        </Switch>
    );
}
