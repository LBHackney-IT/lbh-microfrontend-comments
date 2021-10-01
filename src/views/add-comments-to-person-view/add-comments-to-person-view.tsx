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

import { locale, usePerson } from '../../services';
import { AddCommentsView, AddCommentsViewLegacy } from '../';

const { comments, errors, personName } = locale;
const { heading } = comments;
const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

export const AddCommentsToPersonView = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const hasEnhancedComments = useFeatureToggle('MMH.EnhancedComments');
    const { data: personData, error } = usePerson(id);

    if (error) {
        return (
            <ErrorSummary
                id="entity-error"
                title={unableToFetchRecord}
                description={unableToFetchRecordDescription}
            />
        );
    }

    if (!personData) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

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
                        targetType="person"
                    />
                ) : (
                    <AddCommentsViewLegacy
                        targetName={targetName}
                        targetType="person"
                    />
                )}
            </Layout>
        </PageAnnouncementProvider>
    );
};
