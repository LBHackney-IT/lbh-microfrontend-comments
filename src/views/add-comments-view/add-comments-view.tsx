import React, { useState } from "react";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";

import { Form, Formik } from "formik";

import { AddCommentForm, CommentsFormData, commentsSchema } from "../../components";
import { locale } from "../../services";
import { Relationship } from "../../types";

import { Button, ErrorSummary, PageAnnouncement } from "@mtfh/common";
import { addComment } from "@mtfh/common/lib/api/comments/v2";
import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import { DialogPrompt, Link } from "@mtfh/common/lib/components";

const { comments, errors, dialog } = locale;

export interface AddCommentViewProperties {
  targetName: string;
  targetType: "person" | "tenure" | "asset";
  targetTypeUrl?: "property";
  relationships: Relationship[];
  categories: ReferenceData[];
  errorMessages: Record<string, string>;
}

export type AddCommentFormError = "error" | "invalid";

export interface AddCommentUrlParameters {
  id: string;
}

export const AddCommentsView = ({
  targetName,
  targetType,
  targetTypeUrl,
  relationships,
  categories,
  errorMessages,
}: AddCommentViewProperties): JSX.Element => {
  const { id } = useParams<AddCommentUrlParameters>();
  const [error, setError] = useState<AddCommentFormError | undefined>();
  const [isBlocking, setIsBlocking] = useState(true);
  const history = useHistory();
  const schema = commentsSchema(errorMessages);
  const correctIndicatedErrorsText = errorMessages.W1;
  const addComments = async (values: CommentsFormData) => {
    const { relationshipIds, ...restOfValues } = values;
    const selectedRelationships = relationships.filter((relationship) =>
      relationshipIds.includes(relationship.targetId),
    );
    return Promise.all(
      selectedRelationships.map((selectedRelationship) =>
        addComment({
          ...restOfValues,
          targetType: selectedRelationship.targetType,
          targetId: selectedRelationship.targetId,
        }),
      ),
    );
  };

  const redirectLink = targetTypeUrl || targetType;

  return (
    <>
      <DialogPrompt when={isBlocking} title={dialog.title} />
      <Formik<CommentsFormData>
        initialValues={{
          description: "",
          title: "",
          highlight: false,
          categorisation: {
            category: "",
            subCategory: null,
            description: null,
          },
          relationshipIds: [id],
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={schema}
        onSubmit={async (values, { setErrors }) => {
          setError(undefined);
          try {
            await addComments(values);
            sessionStorage.setItem(
              `${targetType}:heading`,
              comments.commentSuccesfullySavedLabel,
            );
            setIsBlocking(false);
            history.push(`/${redirectLink}/${id}`);
          } catch (error: any) {
            // istanbul ignore else
            if (typeof error === "object" && error.isAxiosError === true) {
              switch (error.response.status) {
                case 400:
                case 404:
                  setErrors(error.response.data.errors);
                  return setError("invalid");
                default:
                  return setError("error");
              }
            }
          }
        }}
      >
        {(properties) => {
          const hasFieldErrors = Object.keys(properties.errors).length > 0;
          return (
            <Form id="add-comment-form" noValidate>
              <PageAnnouncement />

              {(hasFieldErrors || error) && (
                <ErrorSummary id="add-comments-error" title={errors.errorLabel}>
                  <>
                    {hasFieldErrors && <p>{correctIndicatedErrorsText}</p>}
                    {error && <p>{errors.somethingWentWrongLabel}</p>}
                  </>
                </ErrorSummary>
              )}

              {relationships?.length === 1 && (
                <h2 className="add-comment-person govuk-label lbh-label">
                  {comments.addCommentToLabel}{" "}
                  <b data-testid="entity-name">{targetName}</b>:
                </h2>
              )}

              <AddCommentForm
                relationships={relationships}
                formik={properties}
                categories={categories}
              />

              <Button
                type="submit"
                isLoading={properties.isSubmitting}
                loadingText={comments.submittingComment}
              >
                {comments.saveComment}
              </Button>
            </Form>
          );
        }}
      </Formik>
      <div>
        <Link as={RouterLink} to={`/${redirectLink}/${id}`}>
          {comments.discardComment}
        </Link>
      </div>
    </>
  );
};
