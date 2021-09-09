import { useParams, Link as RouterLink } from 'react-router-dom';
import React from 'react';
import {
    Center,
    ErrorSummary,
    Layout,
    Link,
    PageAnnouncement,
    PageAnnouncementProvider,
    Spinner,
} from '@mtfh/common';

import { locale, usePerson } from '../../services';
import { AddCommentForm } from '../../components';
import { AddCommentsView } from '../';

const { comments, errors, personName } = locale;

export const AddCommentsToPersonView = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();

    const { data: personData, error } = usePerson(id);
    const { heading } = comments;
    const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

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
    const targetType = 'person';

    return (
        <PageAnnouncementProvider sessionKey="addComment">
            <PageAnnouncement />
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
                        <h2 className="lbh-heading-h2">{heading}</h2>
                    </>
                }
                data-testid="add-comment-to-person"
            >
                <AddCommentsView
                    targetName={targetName}
                    targetType={targetType}
                />
            </Layout>
        </PageAnnouncementProvider>
    );
};
