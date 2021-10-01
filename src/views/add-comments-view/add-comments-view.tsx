import { useParams, Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
    Button,
    PageAnnouncement,
    ErrorSummary,
    usePageAnnouncement,
} from '@mtfh/common';
import { addComment, locale } from '../../services';
import {
    CommentsFormData,
    commentsSchema,
    AddCommentForm,
} from '../../components';

import { Link, DialogPrompt } from '@mtfh/common/lib/components';

const { comments, errors, dialog } = locale;
export interface AddCommentViewProperties {
    targetName: string;
    targetType: 'person' | 'tenure';
}

export type AddCommentFormError = 'error' | 'invalid';

export interface AddCommentUrlParameters {
    id: string;
}

export const AddCommentsView = ({
    targetName,
    targetType,
}: AddCommentViewProperties): JSX.Element => {
    const { id } = useParams<AddCommentUrlParameters>();
    const [error, setError] = useState<AddCommentFormError | undefined>();
    const [isBlocking, setIsBlocking] = useState(true);

    const { addAnnouncement, clearAnnouncement } = usePageAnnouncement();

    return (
        <>
            <DialogPrompt when={isBlocking} title={dialog.title} />
            <Formik<CommentsFormData>
                initialValues={{
                    description: '',
                    title: '',
                    highlight: false,
                    categorisation: {
                        category: '',
                        subCategory: null,
                        description: null,
                    },
                }}
                validationSchema={commentsSchema}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    setError(undefined);
                    try {
                        await addComment({
                            ...values,
                            targetType,
                            targetId: id,
                        });
                        setIsBlocking(false);
                        resetForm();
                        addAnnouncement({
                            heading: comments.commentSuccesfullySavedLabel,
                        });
                    } catch (error: any) {
                        clearAnnouncement();
                        if (
                            typeof error === 'object' &&
                            error.isAxiosError === true
                        ) {
                            switch (error.status) {
                                case 400:
                                case 404:
                                    setErrors(error.payload.errors);
                                    return setError('invalid');
                                default:
                                    return setError('error');
                            }
                        }
                    }
                }}
            >
                {properties => {
                    const hasFieldErrors =
                        Object.keys(properties.errors).length > 0;

                    return (
                        <Form id="add-comment-form">
                            <PageAnnouncement />

                            {(hasFieldErrors || error) && (
                                <ErrorSummary
                                    id="add-comments-error"
                                    title={errors.errorLabel}
                                >
                                    <>
                                        {hasFieldErrors && (
                                            <p>
                                                {
                                                    errors.pleaseCorrectIndicatedErrorsLabel
                                                }
                                            </p>
                                        )}
                                        {error && (
                                            <p>
                                                {errors.somethingWentWrongLabel}
                                            </p>
                                        )}
                                    </>
                                </ErrorSummary>
                            )}

                            <h2 className="add-comment-person govuk-label lbh-label">
                                {comments.addCommentToLabel}{' '}
                                <b data-testid="entity-name">{targetName}</b>:
                            </h2>
                            <AddCommentForm formik={properties} />

                            <Button
                                type="submit"
                                isLoading={properties.isSubmitting}
                                loadingText={comments.submittingComment}
                            >
                                {comments.saveComment}
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
            <div>
                <Link as={RouterLink} to={`/${targetType}/${id}`}>
                    {comments.discardComment}
                </Link>
            </div>
        </>
    );
};
