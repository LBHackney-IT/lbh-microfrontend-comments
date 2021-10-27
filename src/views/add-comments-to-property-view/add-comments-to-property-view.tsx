import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Asset, useAsset } from "@mtfh/common/lib/api/asset/v1";
import { CommentType } from "@mtfh/common/lib/api/comments/v2";
import { useReferenceData } from "@mtfh/common/lib/api/reference-data/v1";
import {
  Center,
  ErrorSummary,
  Layout,
  Link,
  PageAnnouncementProvider,
  Spinner,
} from "@mtfh/common/lib/components";
import { useErrorCodes } from "@mtfh/common/lib/hooks";

import { locale } from "../../services";
import { Relationship } from "../../types";
import { AddCommentsView } from "../add-comments-view";

const { comments, errors, assetDetails, tenureSummaryPaymentRef } = locale;
const { heading } = comments;
const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

const getRelationships = (propertyData: Asset, targetType: CommentType) => {
  const targetTypeTenure: CommentType = "tenure";

  return [
    {
      label: assetDetails.address(propertyData.assetAddress),
      targetId: propertyData.id,
      targetType,
    },
    {
      targetId: propertyData.tenure.id,
      label: tenureSummaryPaymentRef(propertyData.tenure),
      targetType: targetTypeTenure,
    },
  ];
};

export const AddCommentsToPropertyView = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { data: propertyData, error: propertyError } = useAsset(id);
  const { data: referenceData, error: referenceError } = useReferenceData<"category">({
    category: "comment",
    subCategory: "category",
  });

  const errorMessages = useErrorCodes();

  const targetType: CommentType = "asset";

  if (propertyError || referenceError) {
    return (
      <ErrorSummary
        id="entity-error"
        title={unableToFetchRecord}
        description={unableToFetchRecordDescription}
      />
    );
  }

  if (!propertyData || !referenceData || !errorMessages) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const relationships: Relationship[] = getRelationships(propertyData, targetType);

  const { category: categories } = referenceData;
  const targetName = assetDetails.address(propertyData.assetAddress);

  return (
    <PageAnnouncementProvider sessionKey="addComment">
      <Layout
        top={
          <>
            <Link
              as={RouterLink}
              to={`/property/${id}`}
              variant="back-link"
              data-testid="backButton"
            >
              {targetName}
            </Link>
            <h1 className="lbh-heading-h1">{heading}</h1>
          </>
        }
        data-testid="add-comment-to-property"
      >
        <AddCommentsView
          targetName={targetName}
          targetType={targetType}
          targetTypeUrl="property"
          relationships={relationships}
          categories={categories}
          errorMessages={errorMessages}
        />
      </Layout>
    </PageAnnouncementProvider>
  );
};
