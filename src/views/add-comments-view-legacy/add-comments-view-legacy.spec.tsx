import React from "react";
import { mockPersonV1, postCommentV1, render, server } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageAnnouncementProvider } from "@mtfh/common";
import { locale } from "@services";
import { AddCommentsViewLegacy } from "./add-comments-view-legacy";

const { personName } = locale;

const loadAddCommentForm = () => {
  render(
    <PageAnnouncementProvider sessionKey="addComment">
      <AddCommentsViewLegacy targetName={personName(mockPersonV1)} targetType="person" />
    </PageAnnouncementProvider>,
    {
      url: `/comment/person/${mockPersonV1.id}`,
      path: "/comment/person/:id",
    },
  );
  expect(screen.getByText(locale.comments.saveComment)).toBeInTheDocument();
};

test("it validates the form on submit", async () => {
  loadAddCommentForm();
  const button = screen.getByText(locale.comments.saveComment);
  userEvent.click(button);
  await screen.findByText(locale.errors.pleaseCorrectIndicatedErrorsLabel);
});

test("it submits a comment", async () => {
  loadAddCommentForm();
  const button = screen.getByText(locale.comments.saveComment);

  const descriptionInput = screen.getByTestId("comment-form:description");
  userEvent.type(descriptionInput, "This is a description");

  userEvent.click(button);

  await waitFor(() => {
    expect(
      screen.getByText(locale.comments.commentSuccesfullySavedLabel),
    ).toBeInTheDocument();
  });
});

test("it shows an error if unable to post", async () => {
  server.use(postCommentV1("error", 500));
  loadAddCommentForm();

  const descriptionInput = screen.getByTestId("comment-form:description");
  userEvent.type(descriptionInput, "This is a description");

  const button = screen.getByText(locale.comments.saveComment);
  userEvent.click(button);

  await waitFor(() => {
    expect(screen.queryByText(locale.errors.somethingWentWrongLabel)).toBeInTheDocument();
  });
});

test("it shows an errors form response", async () => {
  server.use(postCommentV1({ errors: { description: "Description error" } }, 400));
  loadAddCommentForm();

  const descriptionInput = screen.getByTestId("comment-form:description");
  userEvent.type(descriptionInput, "This is a description");

  const button = screen.getByText(locale.comments.saveComment);
  userEvent.click(button);

  await waitFor(() => {
    expect(screen.queryByText("Description error")).toBeInTheDocument();
  });
});
