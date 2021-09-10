import React from 'react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { config, locale } from '@services';
import { AddCommentsView } from './add-comments-view';
import { routeRender } from '../../test-utils';
import { server } from '../../mocks/server';
import { mockPerson, mockTenure } from '../../mocks';

const { personName, tenureName, comments } = locale;

const loadAddCommentToPersonForm = async (id?: string) => {
    const utils = routeRender(
        <AddCommentsView
            targetName={personName(mockPerson)}
            targetType="person"
        />
    );
    await waitFor(() => {
        expect(screen.getByText('Save comment')).toBeInTheDocument();
        expect(screen.getByTestId('entity-name').textContent).toEqual(
            'Joan Evans'
        );
    });

    return utils;
};

const loadAddCommentToTenureForm = async (id?: string) => {
    const utils = routeRender(
        <AddCommentsView
            targetName={tenureName(mockTenure)}
            targetType="tenure"
        />
    );
    await waitFor(() => {
        expect(screen.getByText('Save comment')).toBeInTheDocument();
        expect(screen.getByTestId('entity-name').textContent).toEqual(
            'Tenure payment ref: 9148415610'
        );
    });

    return utils;
};

test('it renders correctly with person details', async () => {
    await loadAddCommentToPersonForm();
});

test('it renders correctly with person details', async () => {
    await loadAddCommentToTenureForm();
});

test('it submits the form correctly for person entity', async () => {
    await loadAddCommentToPersonForm();
    const input = screen.getByLabelText(
        /Comment description/
    ) as HTMLTextAreaElement;
    const button = screen.getByText('Save comment');
    userEvent.type(input, 'This is a comment');
    userEvent.click(button);
    await waitFor(() =>
        expect(
            screen.getByText('Comment successfully saved')
        ).toBeInTheDocument()
    );
});

test('it submits the form correctly for tenure entity', async () => {
    await loadAddCommentToTenureForm();
    const input = screen.getByLabelText(
        /Comment description/
    ) as HTMLTextAreaElement;
    const button = screen.getByText('Save comment');
    userEvent.type(input, 'This is a comment');
    userEvent.click(button);
    await waitFor(() =>
        expect(
            screen.getByText('Comment successfully saved')
        ).toBeInTheDocument()
    );
});

test('it validates the form onBlur for person entity', async () => {
    await loadAddCommentToPersonForm();
    const input = screen.getByLabelText(
        /Comment description/
    ) as HTMLTextAreaElement;
    userEvent.type(input, 'This is a comment');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await waitFor(() =>
        expect(
            screen.getByText('Please enter a description for the comment')
        ).toBeInTheDocument()
    );
});

test('it validates the form onBlur for tenure entity', async () => {
    await loadAddCommentToTenureForm();
    const input = screen.getByLabelText(
        /Comment description/
    ) as HTMLTextAreaElement;
    userEvent.type(input, 'This is a comment');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await waitFor(() =>
        expect(
            screen.getByText('Please enter a description for the comment')
        ).toBeInTheDocument()
    );
});
