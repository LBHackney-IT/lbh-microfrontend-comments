import React from "react";
import { getPersonV1, mockPersonV1, render, server } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";
import { locale } from "../../services";
import { AddCommentsToPersonView } from "./add-comments-to-person-view";

test("it renders add comments to person view correctly", async () => {
  render(<AddCommentsToPersonView />, {
    url: `/comment/person/${mockPersonV1.id}`,
    path: "/comment/person/:id",
  });
  await waitFor(() => {
    expect(screen.getByText("Save comment")).toBeInTheDocument();
    expect(screen.getByTestId("backButton").textContent).toBe(
      `${mockPersonV1.firstName} ${mockPersonV1.surname}`,
    );
  });
});

test("it renders the form with all options", async () => {
  render(<AddCommentsToPersonView />, {
    url: `/comment/person/${mockPersonV1.id}`,
    path: "/comment/person/:id",
  });
  await waitFor(() => {
    expect(screen.getByText("Save comment")).toBeInTheDocument();
    expect(screen.getByTestId("backButton").textContent).toEqual(
      locale.personName(mockPersonV1),
    );
  });

  expect(screen.getByLabelText(locale.personName(mockPersonV1))).toBeInTheDocument();

  mockPersonV1.tenures.forEach((tenure) => {
    expect(
      screen.getByLabelText(locale.tenureSummaryPaymentRef(tenure)),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(tenure.assetFullAddress)).toBeInTheDocument();
  });
});

test("it shows invalid state if the fetching person returns 400", async () => {
  server.use(getPersonV1("failure", 400));
  render(<AddCommentsToPersonView />, {
    url: `/comment/person/${mockPersonV1.id}`,
    path: "/comment/person/:id",
  });
  await screen.findByText("There was a problem retrieving the record");
});

test("it shows an error state if the fetching person returns 500", async () => {
  server.use(getPersonV1("failure", 500));
  render(<AddCommentsToPersonView />, {
    url: `/comment/person/${mockPersonV1.id}`,
    path: "/comment/person/:id",
  });
  await screen.findByText("There was a problem retrieving the record");
});
