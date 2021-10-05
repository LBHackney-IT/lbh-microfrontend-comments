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
    CommentsFormDataLegacy,
    commentsSchemaLegacy,
    AddCommentFormLegacy,
} from '../../components';

const { comments, errors } = locale;
export interface AddCommentViewPropertiesLegacy {
    targetName: string;
    targetType: 'person' | 'tenure';
}

export type AddCommentFormErrorLegacy = 'error' | 'invalid';

export interface AddCommentUrlParametersLegacy {
    id: string;
}

export const AddCommentsViewLegacy = ({
    targetName,
    targetType,
}: AddCommentViewPropertiesLegacy): JSX.Element => {
    const { id } = useParams<AddCommentUrlParametersLegacy>();
    const [error, setError] = useState<AddCommentFormErrorLegacy | undefined>();

    const { addAnnouncement, clearAnnouncement } = usePageAnnouncement();

    return (
        <Formik<CommentsFormDataLegacy>
            initialValues={{
                description: '',
            }}
            validationSchema={commentsSchemaLegacy}
            onSubmit={async (values, { setErrors, resetForm }) => {
                setError(undefined);
                try {
                    await addComment({
                        ...values,
                        targetType,
                        targetId: id,
                    });
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
                                        <p>{errors.somethingWentWrongLabel}</p>
                                    )}
                                </>
                            </ErrorSummary>
                        )}

                        <h2 className="add-comment-person govuk-label lbh-label">
                            {comments.addCommentToLabel}{' '}
                            <b data-testid="entity-name">{targetName}</b>:
                        </h2>
                        <AddCommentFormLegacy formik={properties} />

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
    );
};
