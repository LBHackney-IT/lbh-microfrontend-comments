import React from 'react';
import { FormikProps } from 'formik';
import {
    Center,
    Checkbox,
    ErrorSummary,
    Field,
    Input,
    Select,
    Spinner,
    TextArea,
} from '@mtfh/common';
import { useReferenceData } from '@mtfh/common/lib/api/reference-data/v1';
import { CommentsFormData } from '.';
import { locale } from '../../services';

import './add-comment-form.styles.scss';

const { comments } = locale;

interface AddCommentsFormProperties {
    formik: FormikProps<CommentsFormData>;
}

export const AddCommentForm = ({
    formik: { handleChange, handleBlur, values },
}: AddCommentsFormProperties): JSX.Element => {
    const { selectCategory, highlightThisComment } = comments;
    const { data, error } = useReferenceData<'category'>({
        category: 'comment',
        subCategory: 'category',
    });

    if (error) {
        return (
            <ErrorSummary
                id="add-comment-error"
                title={locale.errors.unableToFetchRecord}
                description={locale.errors.unableToFetchRecordDescription}
            />
        );
    }

    if (!data) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    const { category: categories } = data;

    return (
        <>
            <Field
                id="add-comment-title"
                name="title"
                label="Comment title"
                required
            >
                <Input />
            </Field>
            <Field
                id="add-comment-description"
                name="description"
                label="Comment"
                required
            >
                <TextArea
                    rows={5}
                    maxLength={500}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                />
            </Field>
            <Field
                id="add-comment-category"
                name="categorisation.category"
                label="Comment category"
                required
            >
                <Select>
                    <option value="">{selectCategory}</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.code}>
                            {category.value}
                        </option>
                    ))}
                </Select>
            </Field>
            <Checkbox
                onChange={handleChange}
                id="add-comment-category"
                name="highlight"
            >
                <span className="highlight">{highlightThisComment}</span>
            </Checkbox>
        </>
    );
};
