import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { AddCommentsToPersonView } from './';
import { routeRender, get } from '../../test-utils';
import { config } from '../../services';
import { mockPerson } from '../../mocks';

const loadAddCommentsToPersonView = async () => {
    get(`${config.personApiUrl}/persons/:id`, mockPerson);
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
    window.HTMLElement.prototype.scrollIntoView = function () {};
    get(`${config.personApiUrl}/persons/:id`, { message: 'failure' }, 400);
    routeRender(<AddCommentsToPersonView />, {
        url: `/comment/person/${mockPerson.id}`,
        path: '/comment/person/:id',
    });
    await waitFor(() =>
        expect(
            screen.getByText('There was a problem retrieving the record')
        ).toBeInTheDocument()
    );
});

test('it shows an error state if the fetching person returns 500', async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};

    get(`${config.personApiUrl}/persons/:id`, { message: 'failure' }, 500);
    routeRender(<AddCommentsToPersonView />, {
        url: `/comment/person/${mockPerson.id}`,
        path: '/comment/person/:id',
    });
    await waitFor(() =>
        expect(
            screen.getByText('There was a problem retrieving the record')
        ).toBeInTheDocument()
    );
});
