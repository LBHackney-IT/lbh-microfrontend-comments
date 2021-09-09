import { $auth, axiosInstance } from '@mtfh/common';
import { config } from '../config';
import { AddCommentRequestData, Comment } from '../../types';

export const newComment = async (
    data: AddCommentRequestData
): Promise<Comment> => {
    const auth = $auth.getValue();
    return axiosInstance.post(`${config.notesApiUrl}/notes`, {
        ...data,
        createdAt: new Date().toISOString(),
        author: {
            id: auth.sub,
            email: auth.email,
            fullName: auth.name,
        },
    });
};
