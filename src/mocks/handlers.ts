import { rest } from 'msw';
import { mockPerson, mockComment } from './data';
import { config } from '../services';

export const handlers = [
    rest.post(`${config.notesApiUrl}/notes`, (request, response, context) => {
        return response(context.status(200), context.json(mockComment));
    }),

    rest.get(
        `${config.personApiUrl}/persons/:id`,
        (request, response, context) => {
            return response(context.status(200), context.json(mockPerson));
        }
    ),
];
