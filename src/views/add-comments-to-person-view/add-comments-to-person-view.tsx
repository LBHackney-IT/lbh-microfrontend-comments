import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { usePerson } from "@mtfh/common/lib/api/person/v1";
import { useReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import {
  Center,
  ErrorSummary,
  Layout,
  Link,
  PageAnnouncementProvider,
  Spinner,
} from "@mtfh/common/lib/components";
import { useErrorCodes, useFeatureToggle } from "@mtfh/common/lib/hooks";

import { locale } from "../../services";
import { Relationship } from "../../types";
import { AddCommentsView } from "../add-comments-view";
import { AddCommentsViewLegacy } from "../add-comments-view-legacy";

const { comments, errors, personName } = locale;
const { heading } = comments;
const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

export const AddCommentsToPersonView = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const hasEnhancedComments = useFeatureToggle("MMH.EnhancedComments");
  const { data: personData, error: personError } = usePerson(id);
  const { data: referenceData, error: referenceError } = useReferenceData<"category">({
    category: "comment",
    subCategory: "category",
  });

  const errorMessages = useErrorCodes();

  const targetType = "person";

  if (personError || referenceError) {
    return (
      <ErrorSummary
        id="entity-error"
        title={unableToFetchRecord}
        description={unableToFetchRecordDescription}
      />
    );
  }

  if (!personData || !referenceData || !errorMessages) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const relationships: Relationship[] = [
    {
      targetId: id,
      targetType,
    },
  ];

  const { category: categories } = referenceData;
  const targetName = personName(personData);

  return (
    <PageAnnouncementProvider sessionKey="addComment">
      <Layout
        top={
          <>
            <Link
              as={RouterLink}
              to={`/person/${id}`}
              variant="back-link"
              data-testid="backButton"
            >
              {targetName}
            </Link>
            <h1 className="lbh-heading-h1">{heading}</h1>
          </>
        }
        data-testid="add-comment-to-person"
      >
        {hasEnhancedComments ? (
          <AddCommentsView
            targetName={targetName}
            targetType={targetType}
            relationships={relationships}
            categories={categories}
            errorMessages={errorMessages}
          />
        ) : (
          <AddCommentsViewLegacy targetName={targetName} targetType={targetType} />
        )}
      </Layout>
    </PageAnnouncementProvider>
  );
};
