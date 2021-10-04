import { CommentType } from 'types';

export interface Relationship {
    targetId: string;
    targetType: CommentType;
    label?: string;
}
