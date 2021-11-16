import React from "react";

import { getAssetV1, mockAssetV1, render, server } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";

import { locale } from "../../services";
import { AddCommentsToPropertyView } from "./add-comments-to-property-view";

const { assetDetails, tenureSummaryPaymentRef } = locale;

test("it renders add comments to property view correctly", async () => {
  render(<AddCommentsToPropertyView />, {
    url: `/comment/property/${mockAssetV1.id}`,
    path: "/comment/property/:id",
  });
  await waitFor(() => {
    expect(screen.getByText("Save comment")).toBeInTheDocument();
    expect(screen.getByTestId("backButton").textContent).toBe(
      assetDetails.address(mockAssetV1.assetAddress),
    );
  });
});

test("it renders the form with all options", async () => {
  render(<AddCommentsToPropertyView />, {
    url: `/comment/property/${mockAssetV1.id}`,
    path: "/comment/property/:id",
  });
  await waitFor(() => {
    expect(screen.getByText("Save comment")).toBeInTheDocument();
  });

  expect(
    screen.getByLabelText(assetDetails.address(mockAssetV1.assetAddress)),
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText(tenureSummaryPaymentRef(mockAssetV1.tenure)),
  ).toBeInTheDocument();
});

test("it shows invalid state if the fetching property returns 400", async () => {
  server.use(getAssetV1("failure", 400));
  render(<AddCommentsToPropertyView />, {
    url: `/comment/property/${mockAssetV1.id}`,
    path: "/comment/property/:id",
  });
  await screen.findByText("There was a problem retrieving the record");
});

test("it shows an error state if the fetching property returns 500", async () => {
  server.use(getAssetV1("failure", 500));
  render(<AddCommentsToPropertyView />, {
    url: `/comment/property/${mockAssetV1.id}`,
    path: "/comment/property/:id",
  });
  await screen.findByText("There was a problem retrieving the record");
});
