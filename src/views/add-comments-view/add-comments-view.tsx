import { useParams, Link as RouterLink, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, DialogPrompt } from '@mtfh/common/lib/components';
import { ReferenceData } from '@mtfh/common/lib/api/reference-data/v1';
import { Button, PageAnnouncement, ErrorSummary } from '@mtfh/common';
import { Relationship } from 'types/relationships';
import { addComment, locale } from '../../services';
import {
    CommentsFormData,
    AddCommentForm,
    commentsSchema,
} from '../../components';

const { comments, errors, dialog } = locale;

export interface AddCommentViewProperties {
    targetName: string;
    targetType: 'person' | 'tenure';
    relationships: Relationship[];
    categories: ReferenceData[];
    errorMessages: Record<string, string>;
}

export type AddCommentFormError = 'error' | 'invalid';

export interface AddCommentUrlParameters {
    id: string;
}

export const AddCommentsView = ({
    targetName,
    targetType,
    relationships,
    categories,
    errorMessages,
}: AddCommentViewProperties): JSX.Element => {
    const { id } = useParams<AddCommentUrlParameters>();
    const [error, setError] = useState<AddCommentFormError | undefined>();
    const [isBlocking, setIsBlocking] = useState(true);
    const history = useHistory();

    const schema = commentsSchema(errorMessages);
    const correctIndicatedErrorsText = errorMessages.W1;
    const addComments = async (values: CommentsFormData) => {
        const { relationshipIds = [], ...restOfValues } = values;
        const selectedRelationships = relationships.filter(relationship =>
            relationshipIds.includes(relationship.targetId)
        );
        return Promise.all(
            (selectedRelationships || []).map(selectedRelationship =>
                addComment({
                    ...restOfValues,
                    targetType: selectedRelationship.targetType,
                    targetId: selectedRelationship.targetId,
                })
            )
        );
    };

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
                    relationshipIds: [id],
                }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={schema}
                onSubmit={async (values, { setErrors }) => {
                    setError(undefined);
                    try {
                        await addComments(values);
                        sessionStorage.setItem(
                            `${targetType}:heading`,
                            comments.commentSuccesfullySavedLabel
                        );
                        setIsBlocking(false);
                        history.push(`/${targetType}/${id}`);
                    } catch (error: any) {
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
                                            <p>{correctIndicatedErrorsText}</p>
                                        )}
                                        {error && (
                                            <p>
                                                {errors.somethingWentWrongLabel}
                                            </p>
                                        )}
                                    </>
                                </ErrorSummary>
                            )}

                            {relationships?.length === 1 && (
                                <h2 className="add-comment-person govuk-label lbh-label">
                                    {comments.addCommentToLabel}{' '}
                                    <b data-testid="entity-name">
                                        {targetName}
                                    </b>
                                    :
                                </h2>
                            )}

                            <AddCommentForm
                                relationships={relationships}
                                formik={properties}
                                categories={categories}
                            />

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
