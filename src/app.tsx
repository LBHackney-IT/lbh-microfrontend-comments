import React from "react";
import { Route, Switch } from "react-router-dom";

import {
  AddCommentsToPersonView,
  AddCommentsToPropertyView,
  AddCommentsToTenureView,
} from "./views";

export default function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/comment/person/:id">
        <AddCommentsToPersonView />
      </Route>
      <Route path="/comment/tenure/:id">
        <AddCommentsToTenureView />
      </Route>
      <Route path="/comment/property/:id">
        <AddCommentsToPropertyView />
      </Route>
      <Route>
        <div>404</div>
      </Route>
    </Switch>
  );
}
