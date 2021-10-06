import React from "react";
import { ConfirmationRouter } from "@mtfh/common/lib/components";
import "./root.styles.scss";
import App from "./app";

export default function Root(): JSX.Element {
  return (
    <ConfirmationRouter>
      <App />
    </ConfirmationRouter>
  );
}
