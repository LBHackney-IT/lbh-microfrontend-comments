import { useParams, Link as RouterLink } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, ErrorSummary } from '@mtfh/common';
import { ResponseException } from '../../utils';
import { addComment, locale } from '../../services';
import {
    CommentsFormData,
    commentsSchema,
    AddCommentForm,
} from '../../components';

const { comments, errors } = locale;
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
    const controller = useRef(new AbortController());
    const [success, setSuccess] = useState(false);

    return (
        <Formik<CommentsFormData>
            initialValues={{
                description: '',
            }}
            validationSchema={commentsSchema}
            onSubmit={async (values, { setErrors, resetForm }) => {
                setError(undefined);
                try {
                    await addComment({
                        ...values,
                        targetType,
                        targetId: id,
                        options: {
                            signal: controller.current.signal,
                        },
                    });
                    resetForm();
                    setSuccess(true);
                } catch (error) {
                    setSuccess(false);
                    if (error instanceof ResponseException) {
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
                        {success ? (
                            <section
                                className="lbh-page-announcement"
                                role="alert"
                                data-testid="addComment-success"
                            >
                                <h3 className="lbh-page-announcement__title">
                                    {comments.commentSuccesfullySavedLabel}
                                </h3>
                            </section>
                        ) : (
                            (hasFieldErrors || error) && (
                                <div
                                    className="govuk-error-summary optional-extra-class lbh-error-summary"
                                    aria-labelledby="add-comment-error"
                                    role="alert"
                                    tabIndex={-1}
                                    data-testid="addComment-error"
                                >
                                    <h2
                                        className="govuk-error-summary__title"
                                        id="add-comment-error"
                                    >
                                        {errors.errorLabel}
                                    </h2>
                                    <div className="govuk-error-summary__body">
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
                                    </div>
                                </div>
                            )
                        )}

                        <h3 className="add-comment-person govuk-label lbh-label">
                            {comments.addCommentToLabel}{' '}
                            <b data-testid="entity-name">{targetName}</b>:
                        </h3>
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
    );
};
