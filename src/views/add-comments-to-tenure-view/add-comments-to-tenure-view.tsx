import { useParams, Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { Center, ErrorSummary, Layout, Link, Spinner } from '@mtfh/common';

import { locale, useTenure } from '../../services';
import { AddCommentForm } from '../../components';

const { backLinkLabel, comments, errors } = locale;

export const AddCommentsToTenureView = (): JSX.Element => {
    const { type, id } = useParams<{ type: string; id: string }>();

    const { data: tenureData, error } = useTenure(id);
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

    if (!tenureData) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    return (
        <Layout
            top={
                <>
                    <Link
                        as={RouterLink}
                        to={`/${type}/${id}`}
                        variant="back-link"
                        data-testid="backButton"
                    >
                        {backLinkLabel(type, tenureData)}
                    </Link>
                    <h2 className="lbh-heading-h2">{heading}</h2>
                </>
            }
            data-testid="add-comment-to-tenure"
        >
            <AddCommentForm entityName={entityName(type, tenureData)} />
        </Layout>
    );
};
