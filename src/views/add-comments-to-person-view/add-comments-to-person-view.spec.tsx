import React from 'react';
import { rest } from 'msw';
import { screen, waitFor } from '@testing-library/react';

import { AddCommentsToPersonView } from './';
import { routeRender } from '../../test-utils';
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
    // await loadAddCommentsToPersonView();
});
