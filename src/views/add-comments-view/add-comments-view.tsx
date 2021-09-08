import { useParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import { PageAnnouncement, PageAnnouncementProvider } from '@mtfh/common';

import { AddCommentsToPersonView, AddCommentsToTenureView } from '../';

export const AddCommentsView = (): JSX.Element => {
    const { type, id } = useParams<{ type: string; id: string }>();

    const addCommentsForm = useMemo(() => {
        switch (type) {
            case 'person':
                return <AddCommentsToPersonView />;
            case 'tenure':
                return <AddCommentsToTenureView />;
            default:
                return null;
        }
    }, []);

    return (
        <PageAnnouncementProvider sessionKey="addComment">
            <PageAnnouncement />
            {addCommentsForm}
        </PageAnnouncementProvider>
    );
};
