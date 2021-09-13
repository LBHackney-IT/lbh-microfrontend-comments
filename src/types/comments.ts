export type CommentType = 'person' | 'asset' | 'tenure' | 'repair';

export interface AddCommentRequestData {
    description: string;
    targetType: CommentType;
    targetId: string;
    options?: RequestInit;
}

export interface CommentAuthor {
    id: string;
    fullName: string | null;
    email: string | null;
}

export interface Comment {
    id: string;
    description: string;
    targetType: CommentType;
    targetId: string;
    createdAt: string;
    author: CommentAuthor;
}
