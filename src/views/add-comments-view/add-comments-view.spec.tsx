import React from "react";

import { mockPersonV1, postCommentV2, render, server } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { commentsReferenceData } from "../../test-utils";
import { AddCommentsView } from "./add-comments-view";

import commonLocale from "@mtfh/common/lib/locale";

import { locale } from "@services";
import { Relationship } from "types";

const { personName } = locale;
const mockErrorMessages = commonLocale.hooks.defaultErrorMessages;
const mockRelationships: Relationship[] = [
  {
    targetId: mockPersonV1.id,
    targetType: "person",
    label: "Person 1",
  },
  {
    targetId: "test-id",
    targetType: "person",
    label: "Person 2",
  },
];
const loadAddCommentForm = (relationships: Relationship[] = mockRelationships) => {
  render(
    <AddCommentsView
      categories={commentsReferenceData}
      relationships={relationships}
      targetName={personName(mockPersonV1)}
      targetType="person"
      errorMessages={mockErrorMessages}
    />,
    {
      url: `/comment/person/${mockPersonV1.id}`,
      path: "/comment/person/:id",
    },
  );
  expect(screen.getByText(locale.comments.saveComment)).toBeInTheDocument();
};

test("it renders no options with 1 relationship", async () => {
  loadAddCommentForm([
    {
      targetId: mockPersonV1.id,
      targetType: "person",
      label: "Person 1",
    },
  ]);

  expect(screen.queryByText("Person 1")).not.toBeInTheDocument();
});

test("it validates the form on submit", async () => {
  loadAddCommentForm();
  const button = screen.getByText(locale.comments.saveComment);
  userEvent.click(button);
  await screen.findByText(mockErrorMessages.W1);
  expect(screen.getByText(mockErrorMessages.W31)).toBeInTheDocument();
  expect(screen.getByText(mockErrorMessages.W32)).toBeInTheDocument();
});

test("it submits a comment", async () => {
  loadAddCommentForm();
  const button = screen.getByText(locale.comments.saveComment);

  const titleInput = screen.getByLabelText(locale.comments.title, { exact: false });
  userEvent.type(titleInput, "This is a title");

  const descriptionInput = screen.getByTestId("comment-form:description");
  userEvent.type(descriptionInput, "This is a description");

  const checkbox = screen.getByLabelText("Person 2");
  userEvent.click(checkbox);

  const categorySelect = screen.getByLabelText(locale.comments.category, {
    exact: false,
  });
  userEvent.selectOptions(categorySelect, "categoryCode2");

  userEvent.click(button);

  await waitFor(() => {
    expect(window.location.pathname).toBe(`/person/${mockPersonV1.id}`);
  });
});

test("it shows an error if unable to post", async () => {
  server.use(postCommentV2("error", 500));
  loadAddCommentForm();
  const titleInput = screen.getByLabelText(locale.comments.title, { exact: false });
  userEvent.type(titleInput, "This is a title");

  const descriptionInput = screen.getByTestId("comment-form:description");
  userEvent.type(descriptionInput, "This is a description");

  const categorySelect = screen.getByLabelText(locale.comments.category, {
    exact: false,
  });
  userEvent.selectOptions(categorySelect, "categoryCode2");

  const button = screen.getByText(locale.comments.saveComment);
  userEvent.click(button);

  await waitFor(() => {
    expect(screen.queryByText(locale.errors.somethingWentWrongLabel)).toBeInTheDocument();
  });
});

test("it shows an errors form response", async () => {
  server.use(postCommentV2({ errors: { description: "Description error" } }, 400));
  loadAddCommentForm();

  const titleInput = screen.getByLabelText(locale.comments.title, { exact: false });
  userEvent.type(titleInput, "This is a title");

  const descriptionInput = screen.getByTestId("comment-form:description");
  userEvent.type(descriptionInput, "This is a description");

  const categorySelect = screen.getByLabelText(locale.comments.category, {
    exact: false,
  });
  userEvent.selectOptions(categorySelect, "categoryCode2");
  const button = screen.getByText(locale.comments.saveComment);
  userEvent.click(button);

  await waitFor(() => {
    expect(screen.queryByText("Description error")).toBeInTheDocument();
  });
});

test("it shows an error when no options are selected", async () => {
  loadAddCommentForm();

  const checkbox = screen.getByLabelText("Person 1");
  userEvent.click(checkbox);

  const titleInput = screen.getByLabelText(locale.comments.title, { exact: false });
  userEvent.type(titleInput, "This is a title");

  const descriptionInput = screen.getByTestId("comment-form:description");
  userEvent.type(descriptionInput, "This is a description");

  const categorySelect = screen.getByLabelText(locale.comments.category, {
    exact: false,
  });
  userEvent.selectOptions(categorySelect, "categoryCode2");

  const button = screen.getByText(locale.comments.saveComment);
  userEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(mockErrorMessages.W4)).toBeInTheDocument();
  });
});
