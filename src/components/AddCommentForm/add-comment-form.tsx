import React from 'react';
import { FormikProps } from 'formik';
import { ReferenceData } from '@mtfh/common/lib/api/reference-data/v1';
import { Checkbox, Field, Input, Select, TextArea } from '@mtfh/common';

import { Relationship } from 'types';
import { SelectRelationships } from '@components';
import { CommentsFormData } from './index';
import { locale } from '../../services';

import './add-comment-form.styles.scss';

const { comments } = locale;

interface AddCommentsFormProperties {
    relationships: Relationship[];
    formik: FormikProps<CommentsFormData>;
    categories: ReferenceData[];
}

export const AddCommentForm = ({
    relationships,
    formik: { handleChange, handleBlur, values },
    categories,
}: AddCommentsFormProperties): JSX.Element => {
    const { selectCategory, highlightThisComment } = comments;

    return (
        <>
            <SelectRelationships relationships={relationships} />
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
                    {categories?.map((category, index) => (
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
