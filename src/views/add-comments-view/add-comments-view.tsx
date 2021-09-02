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

export const AddCommentsView = (): JSX.Element => {
    const { entityId } = useParams<{ entityId: string }>();
    console.log('entityId', entityId);

    if (false) {
        return (
            <ErrorSummary
                id="entitiy-error"
                title="{locale.errors.unableToFetchRecord}"
                description="{locale.errors.unableToFetchRecordDescription}"
            />
        );
    }

    if (false) {
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
                            to={`/tenure/${entityId}`}
                            variant="back-link"
                        >
                            Back Link
                        </Link>
                        <h1 className="lbh-heading-h1">
                            <h1>H1 tag</h1>
                        </h1>
                        <h2>H2 tag</h2>
                    </>
                }
                data-testid="add-comment"
            >
                Add comment
            </Layout>
        </PageAnnouncementProvider>
    );
};
