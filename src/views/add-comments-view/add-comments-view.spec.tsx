import React from 'react';
import { Formik } from 'formik';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { PageAnnouncementProvider } from '@mtfh/common';
import { render } from '@hackney/mtfh-test-utils';
import { locale } from '@services';
import { AddCommentsView } from './add-comments-view';
import { mockPerson, mockTenure } from '../../mocks';

const { personName, tenureName } = locale;

const loadAddCommentToPersonForm = async () => {
    const utils = render(
        <PageAnnouncementProvider sessionKey="addComment">
            <Formik initialValues={[]} onSubmit={() => {}}>
                <AddCommentsView
                    categories={[]}
                    relationships={[
                        {
                            targetId: mockPerson.id,
                            targetType: 'person',
                        },
                        {
                            targetId: '2',
                            targetType: 'person',
                        },
                    ]}
                    targetName={personName(mockPerson)}
                    targetType="person"
                />
            </Formik>
        </PageAnnouncementProvider>,
        {
            url: `/comment/person/${mockTenure.id}`,
            path: '/comment/person/:id',
        }
    );
    await waitFor(() => {
        expect(screen.getByText('Save comment')).toBeInTheDocument();
    });

    return utils;
};

const loadAddCommentToTenureForm = async () => {
    const utils = render(
        <PageAnnouncementProvider sessionKey="addComment">
            <Formik initialValues={[]} onSubmit={() => {}}>
                <AddCommentsView
                    categories={[]}
                    relationships={[
                        {
                            targetId: mockTenure.id,
                            targetType: 'tenure',
                        },
                        {
                            targetId: '2',
                            targetType: 'person',
                        },
                    ]}
                    targetName={tenureName(mockTenure)}
                    targetType="tenure"
                />
            </Formik>
        </PageAnnouncementProvider>,
        {
            url: `/comment/tenure/${mockTenure.id}`,
            path: '/comment/tenure/:id',
        }
    );
    await waitFor(() => {
        expect(screen.getByText('Save comment')).toBeInTheDocument();
    });

    return utils;
};

test('it renders correctly with person details', async () => {
    await loadAddCommentToPersonForm();
});

test('it renders correctly with tenure details', async () => {
    await loadAddCommentToTenureForm();
});

test('it validates the form on submit for person entity', async () => {
    await loadAddCommentToPersonForm();
    const button = screen.getByText('Save comment');
    userEvent.click(button);
    await waitFor(() =>
        expect(
            screen.getByText('You must enter a title for this comment')
        ).toBeInTheDocument()
    );
});

test('it validates the form on submit for tenure entity', async () => {
    await loadAddCommentToTenureForm();
    const button = screen.getByText('Save comment');
    userEvent.click(button);
    await waitFor(() =>
        expect(
            screen.getByText('You must enter a title for this comment')
        ).toBeInTheDocument()
    );
});

test('it does not validated the form onBlur for person entity', async () => {
    await loadAddCommentToPersonForm();
    const input = screen.getByLabelText(/Comment title/) as HTMLTextAreaElement;
    userEvent.type(input, 'This is a title');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await waitFor(() =>
        expect(
            screen.queryByText('You must enter a title for this comment')
        ).not.toBeInTheDocument()
    );
});

test('it does not validated the form onBlur for tenure entity', async () => {
    await loadAddCommentToTenureForm();
    const input = screen.getByLabelText(/Comment title/) as HTMLTextAreaElement;
    userEvent.type(input, 'This is a title');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    await waitFor(() =>
        expect(
            screen.queryByText('You must enter a title for this comment')
        ).not.toBeInTheDocument()
    );
});
