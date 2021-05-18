import React, { useMemo } from 'react';

import './add-comment-form.styles.scss';
import { FormGroup, TextArea } from '@components';
import { AddCommentFormProperties } from './add-comment-form.types';

export function AddCommentForm({
    formik: { touched, errors, values, ...formik },
    person,
    error,
    success,
}: AddCommentFormProperties): JSX.Element {
    const hasFieldErrors = useMemo(
        () =>
            (Object.keys(errors) as Array<keyof typeof errors>).some(key => {
                return errors[key];
            }),
        [errors]
    );
    return (
        <form
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            data-testid="addComment-form"
        >
            <div className="lbh-container">
                <a
                    href={`/person/${person.id}`}
                    className="govuk-back-link lbh-back-link"
                >
                    Back to Persons Details
                </a>
            </div>
            <h2 className="lbh-heading-h2">Add comment</h2>
            {success ? (
                <section
                    className="lbh-page-announcement"
                    role="alert"
                    data-testid="addComment-success"
                >
                    <h3 className="lbh-page-announcement__title">
                        Comment successfully saved
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
                            Error
                        </h2>
                        <div className="govuk-error-summary__body">
                            {hasFieldErrors && (
                                <p>
                                    Please correct the indicated errors before
                                    submitting this form.
                                </p>
                            )}
                            {error && (
                                <p>Something went wrong. Please try again.</p>
                            )}
                        </div>
                    </div>
                )
            )}
            <h3 className="add-comment-person govuk-label lbh-label">
                Add comment to <b>{`${person.firstName} ${person.surname}`}</b>:
            </h3>
            <FormGroup
                id="person-comment-description"
                name="description"
                label="Comment description"
                error={touched.description && errors.description}
                required
            >
                <TextArea
                    rows={5}
                    maxLength={500}
                    value={values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </FormGroup>

            <button
                className="govuk-button lbh-button"
                type="submit"
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting && (
                    <span className="add-comment-spinner">
                        <span className="govuk-visually-hidden">
                            Submitting...
                        </span>
                    </span>
                )}
                Save comment
            </button>
        </form>
    );
}
