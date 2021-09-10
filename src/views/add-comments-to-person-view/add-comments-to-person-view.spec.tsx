import React from 'react';
import { rest } from 'msw';
import { screen, waitFor } from '@testing-library/react';

import { AddCommentsToPersonView } from './';
import { routeRender, get } from '../../test-utils';
import { config } from '../../services';
import { mockPerson, server } from '../../mocks';

const loadAddCommentsToPersonView = async () => {
    server.use(
        rest.get(
            `${config.personApiUrl}/persons/:id`,
            (request, response, context) => {
                return response.once(
                    context.status(200),
                    context.json(mockPerson)
                );
            }
        )
    );

    const utils = routeRender(<AddCommentsToPersonView />);
    await waitFor(() => {
        expect(screen.getByText('Save comment')).toBeInTheDocument();
        expect(screen.getByTestId('backButton').textContent).toEqual(
            'Joan Evans'
        );
    });

    return utils;
};

test('it renders add comments to person view correctly', async () => {
    await loadAddCommentsToPersonView();
});

test('it shows invalid state if the fetching person returns 400', async () => {
    // server.use(
    //     rest.get(
    //         `${config.personApiUrl}/persons/be8c805c-b1de-11eb-8529-0242ac130003`,
    //         (request, response, context) => {
    //             return response.once(
    //                 context.status(400),
    //                 context.json({ message: 'error' })
    //             );
    //         }
    //     )
    // );
    // routeRender(
    //     <AddCommentForm entityName={entityName('person', mockPerson)} />,
    //     {
    //         url: '/comments/person/be8c805c-b1de-11eb-8529-0242ac130003',
    //         path: '/comment/:targetType/:entityId',
    //     }
    // );
    // await waitFor(() =>
    //     expect(
    //         screen.getByText("The person you've requested does not exist")
    //     ).toBeInTheDocument()
    // );
});

test('it shows an error state if the fetching person returns 500', async () => {
    // server.use(
    //     rest.get(
    //         `${config.personApiUrl}/persons/be8c805c-b1de-11eb-8529-0242ac130003`,
    //         (request, response, context) => {
    //             return response.once(
    //                 context.status(500),
    //                 context.json({ message: 'error' })
    //             );
    //         }
    //     )
    // );
    // customRender(
    //     <AddCommentFormContainer />,
    //     'be8c805c-b1de-11eb-8529-0242ac130003'
    // );
    // await waitFor(() =>
    //     expect(
    //         screen.getByText('There was a problem fetching the data')
    //     ).toBeInTheDocument()
    // );
});
