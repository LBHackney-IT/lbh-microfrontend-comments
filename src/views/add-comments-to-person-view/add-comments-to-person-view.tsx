import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { locale } from "../../services";
import { Relationship } from "../../types";
import { AddCommentsView } from "../add-comments-view";

import { CommentType } from "@mtfh/common/lib/api/comments/v2";
import { Person, usePerson } from "@mtfh/common/lib/api/person/v1";
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

const { comments, errors, personName, tenureSummaryPaymentRef } = locale;
const { heading } = comments;
const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

const getRelationships = (personData: Person, targetType: CommentType) => {
  const tenures: Relationship[] = [];
  const assets: Relationship[] = [];

  for (const tenure of personData.tenures) {
    tenures.push({
      targetId: tenure.id,
      label: tenureSummaryPaymentRef(tenure),
      targetType: "tenure",
    });
    assets.push({
      targetId: tenure.assetId,
      label: tenure.assetFullAddress,
      targetType: "asset",
    });
  }

  return [
    {
      label: personName(personData),
      targetId: personData.id,
      targetType,
    },
    ...assets,
    ...tenures,
  ];
};

export const AddCommentsToPersonView = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
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

  const relationships: Relationship[] = getRelationships(personData, targetType);

  const { category: categories } = referenceData;
  const targetName = personName(personData);

  return (
    <PageAnnouncementProvider sessionKey="addComment">
      <Layout
        backLink={
          <Link
            as={RouterLink}
            to={`/person/${id}`}
            variant="back-link"
            data-testid="backButton"
          >
            {targetName}
          </Link>
        }
        top={<h1 className="lbh-heading-h1">{heading}</h1>}
        data-testid="add-comment-to-person"
      >
        <AddCommentsView
          targetName={targetName}
          targetType={targetType}
          relationships={relationships}
          categories={categories}
          errorMessages={errorMessages}
        />
      </Layout>
    </PageAnnouncementProvider>
  );
};
