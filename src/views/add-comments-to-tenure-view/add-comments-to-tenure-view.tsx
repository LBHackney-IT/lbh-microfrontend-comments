import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import type { CommentType } from "@mtfh/common/lib/api/comments/v2";
import { useReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import { Tenure, useTenure } from "@mtfh/common/lib/api/tenure/v1";

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

const { comments, errors, tenureName, tenureRelationship } = locale;
const { heading } = comments;
const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

const getRelationships = (tenure: Tenure, targetType: CommentType) => {
  const relationships: Relationship[] = [
    {
      label: tenureRelationship(tenure),
      targetId: tenure.id,
      targetType,
    },
  ];

  relationships.push({
    targetId: tenure.tenuredAsset.id,
    label: tenure.tenuredAsset.fullAddress,
    targetType: "asset",
  });

  for (const householdMember of tenure.householdMembers) {
    if (householdMember.isResponsible) {
      relationships.push({
        targetId: householdMember.id,
        label: householdMember.fullName,
        targetType: "person",
      });
    }
  }

  return relationships;
};

export const AddCommentsToTenureView = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const hasEnhancedComments = useFeatureToggle("MMH.EnhancedComments");

  const { data: referenceData, error: referenceError } = useReferenceData<"category">({
    category: "comment",
    subCategory: "category",
  });

  const { data: tenureData, error: tenureError } = useTenure(id);
  const errorMessages = useErrorCodes();

  if (tenureError || referenceError) {
    return (
      <ErrorSummary
        id="entity-error"
        title={unableToFetchRecord}
        description={unableToFetchRecordDescription}
      />
    );
  }
  if (!tenureData || !referenceData || !errorMessages) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const targetType = "tenure";
  const targetName = tenureName(tenureData);
  const { category: categories } = referenceData;
  const relationships = getRelationships(tenureData, targetType);

  return (
    <PageAnnouncementProvider sessionKey="addComment">
      <Layout
        top={
          <>
            <Link
              as={RouterLink}
              to={`/tenure/${id}`}
              variant="back-link"
              data-testid="backButton"
            >
              {targetName}
            </Link>
            <h1 className="lbh-heading-h1">{heading}</h1>
          </>
        }
        data-testid="add-comment-to-tenure"
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
