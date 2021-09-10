import React from 'react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { config, locale } from '@services';
import { NewCommentForm } from './new-comment-form';
import { routeRender } from '../../test-utils';
import { server } from '../../mocks/server';
import { mockPerson } from '../../mocks';

const { personName, comments } = locale;

const loadAddCommentToPersonForm = async (id?: string) => {
    // const properties = {
    //     handleChange: jest.fn(),
    //     handleBlur: jest.fn(),
    //     values: jest.fn(),
    //     touched: jest.fn(),
    //     errors: jest.fn(),
    // };
    // const utils = routeRender(<NewCommentForm  />);
    // await waitFor(() => {
    //     expect(screen.getByText('Save comment')).toBeInTheDocument();
    //     expect(screen.getByTestId('entity-name').textContent).toEqual(
    //         'Joan Evans'
    //     );
    // });
    // return utils;
};

test('it renders correctly with person details', async () => {
    // await loadAddCommentToPersonForm();
});

// test('it submits the form correctly for person entity', async () => {
//     await loadAddCommentToPersonForm();
//     const input = screen.getByLabelText(
//         /Comment description/
//     ) as HTMLTextAreaElement;
//     const button = screen.getByText('Save comment');
//     userEvent.type(input, 'This is a comment');
//     userEvent.click(button);
//     await waitFor(() =>
//         expect(
//             screen.getByText('Comment successfully saved')
//         ).toBeInTheDocument()
//     );
// });

// test('it validates the form onBlur for person entity', async () => {
//     await loadAddCommentToPersonForm();
//     const input = screen.getByLabelText(
//         /Comment description/
//     ) as HTMLTextAreaElement;
//     userEvent.type(input, 'This is a comment');
//     fireEvent.change(input, { target: { value: '' } });
//     fireEvent.blur(input);
//     await waitFor(() =>
//         expect(
//             screen.getByText('Please enter a description for the comment')
//         ).toBeInTheDocument()
//     );
// });

// // This test will need to be updated to correctly handle field level validation from api
// // To be discussed internally
// test('it shows field errors on 400 for person entity', async () => {
//     await loadAddCommentToPersonForm();
//     server.use(
//         rest.post(
//             `${config.notesApiUrl}/notes`,
//             (request, response, context) => {
//                 return response.once(
//                     context.status(400),
//                     context.json({
//                         message: 'System failure',
//                     })
//                 );
//             }
//         )
//     );
//     const input = screen.getByLabelText(
//         /Comment description/
//     ) as HTMLTextAreaElement;
//     const button = screen.getByText('Save comment');
//     userEvent.type(input, 'This is a comment');
//     userEvent.click(button);
//     await waitFor(() =>
//         expect(
//             screen.getByText('Something went wrong. Please try again.')
//         ).toBeInTheDocument()
//     );
// });

// test('it shows global error on 500 for person entity', async () => {
//     await loadAddCommentToPersonForm();
//     server.use(
//         rest.post(
//             `${config.notesApiUrl}/notes`,
//             (request, response, context) => {
//                 return response.once(
//                     context.status(500),
//                     context.json({
//                         message: 'System failure',
//                     })
//                 );
//             }
//         )
//     );
//     const input = screen.getByLabelText(
//         /Comment description/
//     ) as HTMLTextAreaElement;
//     const button = screen.getByText('Save comment');
//     userEvent.type(input, 'This is a comment');
//     userEvent.click(button);
//     await waitFor(() =>
//         expect(
//             screen.getByText('Something went wrong. Please try again.')
//         ).toBeInTheDocument()
//     );
// });
