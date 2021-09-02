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

const { comments } = locale;

export const AddCommentsView = (): JSX.Element => {
    const { type, id } = useParams<{ type: string; id: string }>();
    const { data: entityData, error } = usePerson(id);

    if (error) {
        return (
            <ErrorSummary
                id="entitiy-error"
                title={locale.errors.unableToFetchRecord}
                description={locale.errors.unableToFetchRecordDescription}
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

    const { addCommentToLabel, entityName } = comments;

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
                            {locale.backLinkLabel(entityData)}
                        </Link>
                        <h2 className="lbh-heading-h2">{comments.heading}</h2>
                        <h3 className="add-comment-person govuk-label lbh-label">
                            {addCommentToLabel}{' '}
                            <b data-testid="titleName">
                                {entityName(entityData)}
                            </b>
                            :
                        </h3>
                    </>
                }
                data-testid="add-comment"
            >
                Add comment
            </Layout>
        </PageAnnouncementProvider>
    );
};
