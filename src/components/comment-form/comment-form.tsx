import React from "react";
import { FormikProps } from "formik";
import { Checkbox, Field, Input, Select, TextArea } from "@mtfh/common";
import { ReferenceData } from "@mtfh/common/lib/api/reference-data/v1";

import { locale } from "../../services";
import { SelectRelationships } from "../select-relationships";
import { CommentsFormData } from "./schema";
import { Relationship } from "types";

import "./comment-form.styles.scss";

const { comments } = locale;
const { addCommentToLabel, comment, title, category, categoryPlaceholder, highlight } =
  comments;

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
  return (
    <>
      <SelectRelationships
        relationships={relationships}
        id="add-comment-relationships"
        name="relationshipIds"
        label={addCommentToLabel}
        data-testid="comment-form:options"
        required
      />
      <Field id="add-comment-title" name="title" label={title} required>
        <Input data-testid="comment-form:title" />
      </Field>
      <Field id="add-comment-description" name="description" label={comment} required>
        <TextArea
          rows={5}
          maxLength={500}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          data-testid="comment-form:description"
        />
      </Field>

      <Field
        id="add-comment-category"
        name="categorisation.category"
        label={category}
        required
      >
        <Select data-testid="comment-form:category">
          <option value="">{categoryPlaceholder}</option>
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
        data-testid="comment-form:highlight"
      >
        <span className="highlight">{highlight}</span>
      </Checkbox>
    </>
  );
};
