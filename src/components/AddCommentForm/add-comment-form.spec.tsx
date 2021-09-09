import React from 'react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { config, locale } from '@services';
import { AddCommentForm } from './add-comment-form';
import { routeRender } from '../../test-utils';
import { server } from '../../mocks/server';
import { mockPerson, mockTenure } from '../../mocks';

const { personName, tenureName, comments } = locale;

const loadAddCommentToPersonForm = async (id?: string) => {
    const utils = routeRender(
        <AddCommentForm
            entityName={personName(mockPerson)}
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
        <AddCommentForm
            entityName={tenureName(mockTenure)}
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

// This test will need to be updated to correctly handle field level validation from api
// To be discussed internally
test('it shows field errors on 400 for person entity', async () => {
    await loadAddCommentToPersonForm();
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

test('it shows field errors on 400 for tenure entity', async () => {
    await loadAddCommentToTenureForm();
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

test('it shows global error on 500 for person entity', async () => {
    await loadAddCommentToPersonForm();
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

test('it shows global error on 500 for tenure entity', async () => {
    await loadAddCommentToTenureForm();
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
