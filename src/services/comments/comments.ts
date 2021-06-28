import { $auth } from '@mtfh/common';
import { ResponseException } from '@utilities';
import { AddCommentRequestData, Comment } from './comments.types';
import { config } from '../config';

const headers = {
    'Content-Type': 'application/json',
    'x-api-key': config.notesApiKey,
    'Authorization': `Bearer ${$auth.getValue().token}`,
};

export const addComment = async ({
    options = {},
    ...data
}: AddCommentRequestData): Promise<Comment> => {
    const auth = $auth.getValue();
    const response = await fetch(`${config.notesApiUrl}/notes`, {
        method: 'POST',
        body: JSON.stringify({
            ...data,
            createdAt: new Date().toISOString(),
            author: {
                id: auth.sub,
                email: auth.email,
                fullName: auth.name,
            },
        }),
        ...options,
        headers: {
            ...options.headers,
            ...headers,
        },
    });

    const result = await response.json();

    if (response.ok) {
        return result;
    }

    throw new ResponseException(result, response);
};
