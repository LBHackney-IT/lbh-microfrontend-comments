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

import { locale, useEntity } from '../../services';
import { AddCommentForm } from '../../components';

const { backLinkLabel, comments, errors } = locale;

export const AddCommentsView = (): JSX.Element => {
    const { type, id } = useParams<{ type: string; id: string }>();

    const { data: entityData, error } = useEntity(id, type);
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
                            {backLinkLabel(type, entityData)}
                        </Link>
                        <h2 className="lbh-heading-h2">{heading}</h2>
                    </>
                }
                data-testid="add-comment"
            >
                <AddCommentForm entityName={entityName(type, entityData)} />
            </Layout>
        </PageAnnouncementProvider>
    );
};
