import { useParams, Link as RouterLink } from 'react-router-dom';
import React from 'react';
import {
    Center,
    ErrorSummary,
    Layout,
    Link,
    PageAnnouncementProvider,
    Spinner,
} from '@mtfh/common';

import { locale, usePerson } from '../../services';
import { AddCommentsView } from '../';

const { comments, errors, personName } = locale;
const { heading } = comments;
const { unableToFetchRecord, unableToFetchRecordDescription } = errors;

export const AddCommentsToPersonView = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();

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
                        <h2 className="lbh-heading-h2">{heading}</h2>
                    </>
                }
                data-testid="add-comment-to-person"
            >
                <AddCommentsView targetName={targetName} targetType="person" />
            </Layout>
        </PageAnnouncementProvider>
    );
};
