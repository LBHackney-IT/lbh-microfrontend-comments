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

import { locale, useTenure } from '../../services';
import { AddCommentsView } from '../';

const { comments, errors, tenureName } = locale;
const { heading } = comments;
const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

export const AddCommentsToTenureView = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();

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

    const targetName = tenureName(tenureData);

    return (
        <PageAnnouncementProvider sessionKey="addComment">
            <PageAnnouncement />
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
                        <h2 className="lbh-heading-h2">{heading}</h2>
                    </>
                }
                data-testid="add-comment-to-tenure"
            >
                <AddCommentsView targetName={targetName} targetType="tenure" />
            </Layout>
        </PageAnnouncementProvider>
    );
};
