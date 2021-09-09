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

test('it renders add comments to person view correctly', async () => {
    // await loadAddCommentsToPersonView();
});
