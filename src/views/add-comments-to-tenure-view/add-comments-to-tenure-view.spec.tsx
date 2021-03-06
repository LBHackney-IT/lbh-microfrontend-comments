import React from "react";

import {
  getTenureV1,
  mockActiveTenureV1,
  render,
  server,
} from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";

import { locale } from "../../services";
import { AddCommentsToTenureView } from "./add-comments-to-tenure-view";

describe("AddCommentsToTenureView", () => {
  test("it renders the form with all options", async () => {
    render(<AddCommentsToTenureView />, {
      url: `/comment/tenure/${mockActiveTenureV1.id}`,
      path: "/comment/tenure/:id",
    });
    await waitFor(() => {
      expect(screen.getByText("Save comment")).toBeInTheDocument();
      expect(screen.getByTestId("backButton").textContent).toEqual(
        locale.tenureName(mockActiveTenureV1),
      );
    });

    expect(
      screen.getByLabelText(locale.tenurePaymentRef(mockActiveTenureV1)),
    ).toBeInTheDocument();

    mockActiveTenureV1.householdMembers.forEach((member) => {
      if (member.isResponsible) {
        expect(screen.getByLabelText(member.fullName)).toBeInTheDocument();
      } else {
        expect(screen.queryByLabelText(member.fullName)).not.toBeInTheDocument();
      }
    });

    expect(
      screen.getByLabelText(mockActiveTenureV1.tenuredAsset.fullAddress),
    ).toBeInTheDocument();
  });

  test("it renders add comments to tenure view correctly", async () => {
    render(<AddCommentsToTenureView />, {
      url: `/comment/tenure/${mockActiveTenureV1.id}`,
      path: "/comment/tenure/:id",
    });
    await waitFor(() => {
      expect(screen.getByText(locale.comments.saveComment)).toBeInTheDocument();
      expect(screen.getByTestId("backButton").textContent).toEqual(
        `Tenure payment ref: ${mockActiveTenureV1.paymentReference}`,
      );
    });
  });

  test("it shows invalid state if the fetching tenure returns 400", async () => {
    server.use(getTenureV1("error", 400));
    render(<AddCommentsToTenureView />, {
      url: `/comment/tenure/${mockActiveTenureV1.id}`,
      path: "/comment/tenure/:id",
    });
    await screen.findByText("There was a problem retrieving the record");
  });
});
