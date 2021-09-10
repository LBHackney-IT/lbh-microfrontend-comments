import React from 'react';
import { rest } from 'msw';
import { screen, waitFor } from '@testing-library/react';

import { routeRender } from '../../test-utils';
import { config } from '../../services';
import { mockTenure, server } from '../../mocks';
import { AddCommentsToTenureView } from '.';

const loadAddCommentsToPersonView = async (id?: string) => {
    server.use(
        rest.get(
            `${config.tenureApiUrl}/tenure/:id`,
            (request, response, context) => {
                return response.once(
                    context.status(200),
                    context.json(mockTenure)
                );
            }
        )
    );

    const utils = routeRender(<AddCommentsToTenureView />, {
        url: `/comment/tenure/123`,
        path: '/comment/:targetType/:entityId',
    });
    await waitFor(() => {
        expect(screen.getByText('Save comment')).toBeInTheDocument();
        expect(screen.getByTestId('backButton').textContent).toEqual(
            'Joan Evans'
        );
    });

    return utils;
};

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
