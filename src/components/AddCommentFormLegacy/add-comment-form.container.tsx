import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useFormik } from 'formik';

import { ResponseException } from '@utilities';
import { addComment, getPersonById, Person } from '@services';
import {
    AddCommentUrlParameters,
    FetchState,
    AddCommentFormError,
} from './add-comment-form.types';
import { schema } from './add-comment-form.schema';
import { AddCommentForm } from './add-comment-form.component';

export function AddCommentFormContainer(): JSX.Element {
    const { type, id } = useParams<AddCommentUrlParameters>();
    const [status, setStatus] = useState<FetchState>('loading');
    const [person, setPerson] = useState<Person>();
    const [globalError, setGlobalError] = useState<
        AddCommentFormError | undefined
    >();
    const [globalSuccess, setGlobalSuccess] = useState(false);
    const controller = useRef(new AbortController());

    const getPerson = useCallback(async () => {
        try {
            const data = await getPersonById({
                id,
                options: { signal: controller.current.signal },
            });
            setPerson(data);
            setStatus('done');
        } catch (error) {
            if (error instanceof ResponseException) {
                switch (error.status) {
                    case 400:
                    case 404:
                        return setStatus('invalid');
                    default:
                        return setStatus('error');
                }
            }
        }
    }, [id]);

    useEffect(() => {
        getPerson();
        return () => controller.current.abort();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            description: '',
        },
        validationSchema: schema,
        onSubmit: async values => {
            setGlobalError(undefined);
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
                setGlobalSuccess(true);
            } catch (error) {
                setGlobalSuccess(false);
                if (error instanceof ResponseException) {
                    switch (error.status) {
                        case 400:
                            // formik.setErrors(error.payload.errors);
                            return setGlobalError('invalid');
                        default:
                            return setGlobalError('error');
                    }
                }
            }
        },
    });

    useEffect(() => {
        const hasErrors = Object.keys(formik.errors).length > 0;
        if (hasErrors) {
            setGlobalSuccess(false);
        }
    }, [formik.errors]);

    if (!id || status === 'invalid') {
        return <div>The person you've requested does not exist</div>;
    }

    if (status === 'error') {
        return (
            <div>
                <div
                    className="govuk-error-summary optional-extra-class lbh-error-summary"
                    aria-labelledby="error-summary-title"
                    role="alert"
                    tabIndex={-1}
                    data-module="govuk-error-summary"
                >
                    <h2
                        className="govuk-error-summary__title"
                        id="error-summary-title"
                    >
                        There was a problem fetching the data
                    </h2>
                </div>
                <button className="govuk-button lbh-button" onClick={getPerson}>
                    Try again
                </button>
            </div>
        );
    }

    if (status === 'loading' || !person) {
        return <div>Fetching Person Details...</div>;
    }

    return (
        <AddCommentForm
            formik={formik}
            person={person}
            error={globalError}
            success={globalSuccess}
        />
    );
}
