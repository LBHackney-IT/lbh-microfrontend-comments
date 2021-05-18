import React from 'react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { config } from '@services';
import { AddCommentFormContainer } from './add-comment-form.container';
import { customRender } from '../../test-utils';
import { server } from '../../mocks/server';

const loadForm = async (id?: string) => {
    const utils = customRender(<AddCommentFormContainer />, id);
    await waitFor(() =>
        expect(screen.getByText('Save comment')).toBeInTheDocument()
    );

    await waitFor(() =>
        expect(screen.getByText('Back to Persons Details')).toBeInTheDocument()
    );

    return utils;
};

test('it renders correctly', async () => {
    await loadForm();
});

test('it shows invalid state if the fetching person returns 400', async () => {
    server.use(
        rest.get(
            `${config.personApiUrl}/persons/be8c805c-b1de-11eb-8529-0242ac130003`,
            (request, response, context) => {
                return response.once(
                    context.status(400),
                    context.json({ message: 'error' })
                );
            }
        )
    );
    customRender(
        <AddCommentFormContainer />,
        'be8c805c-b1de-11eb-8529-0242ac130003'
    );
    await waitFor(() =>
        expect(
            screen.getByText("The person you've requested does not exist")
        ).toBeInTheDocument()
    );
});

test('it shows an error state if the fetching person returns 500', async () => {
    server.use(
        rest.get(
            `${config.personApiUrl}/persons/be8c805c-b1de-11eb-8529-0242ac130003`,
            (request, response, context) => {
                return response.once(
                    context.status(500),
                    context.json({ message: 'error' })
                );
            }
        )
    );
    customRender(
        <AddCommentFormContainer />,
        'be8c805c-b1de-11eb-8529-0242ac130003'
    );
    await waitFor(() =>
        expect(
            screen.getByText('There was a problem fetching the data')
        ).toBeInTheDocument()
    );
});

test('it submits the form correctly', async () => {
    await loadForm();

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

test('it validates the form onBlur', async () => {
    await loadForm();

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

// This test will need to be updated to correctly handle field level validation from api
// To be discussed internally
test('it shows field errors on 400', async () => {
    await loadForm();

    server.use(
        rest.post(
            `${config.notesApiUrl}/notes`,
            (request, response, context) => {
                return response.once(
                    context.status(400),
                    context.json({
                        message: 'System failure',
                    })
                );
            }
        )
    );

    const input = screen.getByLabelText(
        /Comment description/
    ) as HTMLTextAreaElement;
    const button = screen.getByText('Save comment');

    userEvent.type(input, 'This is a comment');
    userEvent.click(button);

    await waitFor(() =>
        expect(
            screen.getByText('Something went wrong. Please try again.')
        ).toBeInTheDocument()
    );
});

test('it shows global error on 500', async () => {
    await loadForm();

    server.use(
        rest.post(
            `${config.notesApiUrl}/notes`,
            (request, response, context) => {
                return response.once(
                    context.status(500),
                    context.json({
                        message: 'System failure',
                    })
                );
            }
        )
    );

    const input = screen.getByLabelText(
        /Comment description/
    ) as HTMLTextAreaElement;
    const button = screen.getByText('Save comment');

    userEvent.type(input, 'This is a comment');
    userEvent.click(button);

    await waitFor(() =>
        expect(
            screen.getByText('Something went wrong. Please try again.')
        ).toBeInTheDocument()
    );
});
