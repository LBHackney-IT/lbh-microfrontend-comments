import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@hackney/mtfh-test-utils';

import { get } from '../../test-utils';
import { config } from '../../services';
import { mockTenure } from '../../mocks';
import { AddCommentsToTenureView } from '.';

const loadAddCommentsToTenureView = async (id?: string) => {
    get(`${config.tenureApiUrl}/tenures/:id`, mockTenure);
    const utils = render(<AddCommentsToTenureView />, {
        url: `/comment/tenure/${mockTenure.id}`,
        path: '/comment/tenure/:id',
    });
    await waitFor(() => {
        expect(screen.getByText('Save comment')).toBeInTheDocument();
        expect(screen.getByTestId('backButton').textContent).toEqual(
            'Tenure payment ref: 9148415610'
        );
    });

    return utils;
};

test('it renders add comments to tenure view correctly', async () => {
    await loadAddCommentsToTenureView();
});

// test('it shows invalid state if the fetching tenure returns 400', async () => {
//     get(`${config.tenureApiUrl}/tenures/:id`, { message: 'failure' }, 400);
//     routeRender(<AddCommentsToTenureView />, {
//         url: `/comment/tenure/${mockTenure.id}`,
//         path: '/comment/tenure/:id',
//     });
//     await waitFor(() =>
//         expect(
//             screen.getByText("There was a problem retrieving the record")
//         ).toBeInTheDocument()
//     );
// });
