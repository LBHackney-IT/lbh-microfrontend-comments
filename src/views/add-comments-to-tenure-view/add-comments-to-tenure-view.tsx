import { useParams, Link as RouterLink } from 'react-router-dom';
import React from 'react';
import {
    Center,
    ErrorSummary,
    Layout,
    Link,
    PageAnnouncementProvider,
    Spinner,
    useFeatureToggle,
} from '@mtfh/common';

import { locale, useTenure } from '../../services';
import { AddCommentsView, AddCommentsViewLegacy } from '../';
import { CommentType, HouseholdMember, Relationship, Tenure } from 'types';

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

    tenureData.householdMembers?.forEach((householdMember: HouseholdMember) => {
        if (householdMember.isResponsible) {
            relationships.push({
                targetId: householdMember.id,
                label: householdMember.fullName,
                targetType: 'person',
            });
        }
    });

    return relationships;
};

export const AddCommentsToTenureView = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const hasEnhancedComments = useFeatureToggle('MMH.EnhancedComments');

    const { data: tenureData, error } = useTenure(id);

    if (error) {
        return (
            <ErrorSummary
                id="entity-error"
                title={unableToFetchRecord}
                description={unableToFetchRecordDescription}
            />
        );
    }

    if (!tenureData) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    const targetType = 'tenure';
    const targetName = tenureName(tenureData);

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
