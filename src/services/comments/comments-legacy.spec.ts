import { rest } from 'msw';
import { addComment } from './comments-legacy';
import { config } from '../config';
import { server, mockComment } from '../../mocks';

test('it returns data on an ok response', async () => {
    const data = await addComment({
        description: 'comment',
        targetType: 'person',
        targetId: 'string',
    });
    expect(data).toStrictEqual(mockComment);
});

test('it throws an ResponseException on bad request', async () => {
    const url = `${config.notesApiUrl}/notes`;
    server.use(
        rest.post(url, (request, response, context) => {
            return response.once(
                context.status(400),
                context.json({
                    message: '400',
                })
            );
        })
    );
    await expect(() =>
        addComment({
            description: 'comment',
            targetType: 'person',
            targetId: 'string',
        })
    ).rejects.toThrow(`[400] ${url}`);
});
