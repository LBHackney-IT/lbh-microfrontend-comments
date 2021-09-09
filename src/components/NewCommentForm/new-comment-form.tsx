import React from 'react';
import { FormikProps } from 'formik';
import { FormGroup, TextArea } from '@mtfh/common';
import { CommentsFormData } from '..';

interface AddCommentsFormProperties {
    formik: FormikProps<CommentsFormData>;
}

export const NewCommentForm = ({
    formik: { handleChange, handleBlur, values, setValues, touched, errors },
}: AddCommentsFormProperties): JSX.Element => {
    return (
        <FormGroup
            id="add-comment-description"
            name="description"
            label="Comment description"
            error={touched.description && errors.description}
            required
        >
            <TextArea
                rows={5}
                maxLength={500}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
            />
        </FormGroup>
    );
};
