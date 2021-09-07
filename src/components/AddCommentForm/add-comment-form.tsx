import { useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Formik, Form, useFormik } from 'formik';
import { Button, FormGroup, TextArea } from '@mtfh/common';
import { ResponseException } from '@utilities';
import { addComment, locale } from '@services';
import { commentsSchema } from './schema';

const { comments, errors } = locale;

export type AddCommentFormError = 'error' | 'invalid';

export interface AddCommentUrlParameters {
    id: string;
    type: 'person' | 'tenure' | 'asset' | 'repair';
}

export interface AddCommentFormProperties {
    entityName: string;
}

export const AddCommentForm = ({
    entityName,
}: AddCommentFormProperties): JSX.Element => {
    const { type, id } = useParams<AddCommentUrlParameters>();
    const [error, setError] = useState<AddCommentFormError | undefined>();
    const controller = useRef(new AbortController());
    const [success, setSuccess] = useState(false);

    const formik = useFormik({
        initialValues: {
            description: '',
        },
        validationSchema: commentsSchema,
        onSubmit: async values => {
            setError(undefined);
            try {
                await addComment({
                    ...values,
                    targetType: type,
                    targetId: id,
                    options: {
                        signal: controller.current.signal,
                    },
                });
                formik.resetForm();
                setSuccess(true);
            } catch (error) {
                setSuccess(false);
                if (error instanceof ResponseException) {
                    switch (error.status) {
                        case 400:
                            // formik.setErrors(error.payload.errors);
                            return setError('invalid');
                        default:
                            return setError('error');
                    }
                }
            }
        },
    });

    useEffect(() => {
        const hasErrors = Object.keys(formik.errors).length > 0;
        if (hasErrors) {
            setSuccess(false);
        }
    }, [formik.errors]);

    const hasFieldErrors = useMemo(
        () =>
            (Object.keys(formik.errors) as Array<
                keyof typeof formik.errors
            >).some(key => {
                return formik.errors[key];
            }),
        [formik.errors]
    );

    const handleSubmitForm = () => {
        formik.handleSubmit();
    };

    return (
        <>
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
                                    {errors.pleaseCorrectIndicatedErrorsLabel}
                                </p>
                            )}
                            {error && <p>{errors.somethingWentWrongLabel}</p>}
                        </div>
                    </div>
                )
            )}
            <h3 className="add-comment-person govuk-label lbh-label">
                {comments.addCommentToLabel}{' '}
                <b data-testid="titleName">{entityName}</b>:
            </h3>
            <Formik {...formik} onSubmit={handleSubmitForm}>
                <Form id="add-comment-form">
                    <FormGroup
                        id="add---comment-description"
                        name="description"
                        label="Comment description"
                        error={
                            formik.touched.description &&
                            formik.errors.description
                        }
                        required
                    >
                        <TextArea
                            rows={5}
                            maxLength={500}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        isLoading={formik.isSubmitting}
                        loadingText={comments.submittingComment}
                    >
                        {comments.saveComment}
                    </Button>
                </Form>
            </Formik>
        </>
    );
};
