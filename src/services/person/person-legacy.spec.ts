import { rest } from 'msw';
import { getPersonById } from './person-legacy';
import { config } from '../config';
import { server, mockPerson } from '../../mocks';

test('it throws an error if the id is falsy', async () => {
    await expect(() => getPersonById({ id: '' })).rejects.toThrow(
        'Missing `id` for Person'
    );
});

test('it returns data on an ok response', async () => {
    const data = await getPersonById({
        id: '1234',
    });
    expect(data).toStrictEqual(mockPerson);
});

test('it throws an ResponseException on bad request', async () => {
    const url = `${config.personApiUrl}/persons/1234`;
    server.use(
        rest.get(url, (request, response, context) => {
            return response.once(
                context.status(404),
                context.json({
                    message: '404',
                })
            );
        })
    );
    await expect(() =>
        getPersonById({
            id: '1234',
        })
    ).rejects.toThrow(`[404] ${url}`);
});
