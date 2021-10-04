import { useParams, Link as RouterLink } from 'react-router-dom';
import React from 'react';
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

import { Relationship } from 'types';
import { locale, usePerson } from '../../services';
import { AddCommentsView, AddCommentsViewLegacy } from '../';

const { comments, errors, personName } = locale;
const { heading } = comments;
const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

export const AddCommentsToPersonView = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const hasEnhancedComments = useFeatureToggle('MMH.EnhancedComments');
    const { data: personData, error: personError } = usePerson(id);

    const {
        data: referenceData,
        error: referenceError,
    } = useReferenceData<'category'>({
        category: 'comment',
        subCategory: 'category',
    });

    const targetType = 'person';

    if (personError || referenceError) {
        return (
            <ErrorSummary
                id="entity-error"
                title={unableToFetchRecord}
                description={unableToFetchRecordDescription}
            />
        );
    }

    if (!personData || !referenceData) {
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
