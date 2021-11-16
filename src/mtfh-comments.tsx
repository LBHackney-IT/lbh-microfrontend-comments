import React from "react";
import ReactDOM from "react-dom";

import singleSpaReact from "single-spa-react";

import Root from "./root.component";

import { ErrorSummary } from "@mtfh/common/lib/components";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary() {
    return (
      <ErrorSummary
        id="mtfh-comments"
        title="Error"
        description="Unable to load comments"
      />
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
