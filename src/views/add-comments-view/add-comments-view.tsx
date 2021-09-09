import React from 'react';
import { AddCommentForm } from '../../components';

export interface AddCommentViewProperties {
    targetName: string;
    targetType: 'person' | 'tenure';
}

export const AddCommentsView = ({
    targetName,
    targetType,
}: AddCommentViewProperties): JSX.Element => {
    return (
        <div data-testid="add-comment-view">
            <AddCommentForm entityName={targetName} targetType={targetType} />
        </div>
    );
};
