import React from "react";
import { FormikProps } from "formik";
import { FormGroup, TextArea } from "@mtfh/common/lib/components";
import { CommentsFormDataLegacy } from "./schema";

import "./comment-form.styles.scss";

interface AddCommentsFormProperties {
  formik: FormikProps<CommentsFormDataLegacy>;
}

export const AddCommentFormLegacy = ({
  formik: { handleChange, handleBlur, values, touched, errors },
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
        data-testid="comment-form:description"
      />
    </FormGroup>
  );
};
