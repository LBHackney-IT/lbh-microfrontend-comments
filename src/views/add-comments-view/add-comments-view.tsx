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

const { backLinkLabel, comments, errors } = locale;

export const AddCommentsView = (): JSX.Element => {
    const { type, id } = useParams<{ type: string; id: string }>();
    const { data: entityData, error } = usePerson(id);

    const { entityName, heading } = comments;
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

    if (!entityData) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    return (
        <PageAnnouncementProvider sessionKey="addComment">
            <PageAnnouncement />
            <Layout
                top={
                    <>
                        <Link
                            as={RouterLink}
                            to={`/${type}/${id}`}
                            variant="back-link"
                        >
                            {backLinkLabel(entityData)}
                        </Link>
                        <h2 className="lbh-heading-h2">{heading}</h2>
                    </>
                }
                data-testid="add-comment"
            >
                <AddCommentForm entityName={entityName(entityData)} />
            </Layout>
        </PageAnnouncementProvider>
    );
};
