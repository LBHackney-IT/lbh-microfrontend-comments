import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { PageAnnouncementProvider } from '@mtfh/common';
import { locale } from '@services';
import { AddCommentsView } from './add-comments-view';
import { mockPerson, mockTenure } from '../../mocks';
import { render } from '@hackney/mtfh-test-utils';

const { personName, tenureName } = locale;

const loadAddCommentToPersonForm = async () => {
    const utils = render(
        <PageAnnouncementProvider sessionKey="addComment">
            <AddCommentsView
                categories={[]}
                relationships={[
                    {
                        targetId: mockPerson.id,
                        targetType: 'person',
                    },
                ]}
                targetName={personName(mockPerson)}
                targetType="person"
            />
        </PageAnnouncementProvider>
    );
    await waitFor(() => {
        expect(screen.getByText('Save comment')).toBeInTheDocument();
        expect(screen.getByTestId('entity-name').textContent).toEqual(
            'Joan Evans'
        );
    });

    return utils;
};

const loadAddCommentToTenureForm = async () => {
    const utils = render(
        <PageAnnouncementProvider sessionKey="addComment">
            <AddCommentsView
                categories={[]}
                relationships={[
                    {
                        targetId: mockTenure.id,
                        targetType: 'tenure',
                    },
                ]}
                targetName={tenureName(mockTenure)}
                targetType="tenure"
            />
        </PageAnnouncementProvider>,
        {
            url: `/comment/tenure/${mockTenure.id}`,
            path: '/comment/tenure/:id',
        }
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

test.only('it renders correctly with person details', async () => {
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

// test('it shows error if post request for add new comment fails', async () => {
//     post('/api/v1/notes', 'error', 404);
//     render(
//         <AddCommentsView
//             targetName={personName(mockPerson)}
//             targetType="person"
//         />
//     );
//     const input = screen.getByLabelText(
//         /Comment description/
//     ) as HTMLTextAreaElement;
//     userEvent.type(input, 'This is a comment');
//     fireEvent.change(input, { target: { value: '' } });
//     fireEvent.blur(input);

//     await waitFor(() =>
//         expect(
//             screen.getByText('Error')
//         ).toBeInTheDocument()
//     );

// });
