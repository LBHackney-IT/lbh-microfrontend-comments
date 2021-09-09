import { axiosInstance } from '@mtfh/common';
import { config } from '../config';
import { AddCommentRequestData, Comment } from '../../types';

export const newComment = async (
    parameters: AddCommentRequestData
): Promise<Comment> => {
    const { data: tenure } = await axiosInstance.post<Comment>(
        `${config.notesApiUrl}/notes`,
        parameters
    );

    return tenure;
};
