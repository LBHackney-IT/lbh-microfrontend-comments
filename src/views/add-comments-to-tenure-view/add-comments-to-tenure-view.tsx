import { useParams, Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { useErrorCodes } from '@mtfh/common/lib/hooks';
import { useReferenceData } from '@mtfh/common/lib/api/reference-data/v1';
import {
    Center,
    ErrorSummary,
    Layout,
    Link,
    PageAnnouncementProvider,
    Spinner,
    useFeatureToggle,
} from '@mtfh/common';

import { CommentType, Relationship, Tenure } from 'types';
import { locale, useTenure } from '../../services';
import { AddCommentsView, AddCommentsViewLegacy } from '../';

const { comments, errors, tenureName } = locale;
const { heading } = comments;
const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

const getRelationships = (tenureData: Tenure, targetType: CommentType) => {
    const relationships: Relationship[] = [
        {
            label: `Tenure payment ref ${tenureData.paymentReference} (${tenureData.tenureType?.description})`,
            targetId: tenureData.id,
            targetType,
        },
    ];

    if (tenureData.tenuredAsset) {
        relationships.push({
            targetId: tenureData.tenuredAsset.id,
            label: tenureData.tenuredAsset.fullAddress,
            targetType: 'asset',
        });
    }

    if (tenureData.householdMembers) {
        for (const householdMember of tenureData.householdMembers) {
            if (householdMember.isResponsible) {
                relationships.push({
                    targetId: householdMember.id,
                    label: householdMember.fullName,
                    targetType: 'person',
                });
            }
        }
    }

    return relationships;
};

export const AddCommentsToTenureView = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const hasEnhancedComments = useFeatureToggle('MMH.EnhancedComments');

    const {
        data: referenceData,
        error: referenceError,
    } = useReferenceData<'category'>({
        category: 'comment',
        subCategory: 'category',
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

    const targetType = 'tenure';
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
                    <AddCommentsViewLegacy
                        targetName={targetName}
                        targetType={targetType}
                    />
                )}
            </Layout>
        </PageAnnouncementProvider>
    );
};
