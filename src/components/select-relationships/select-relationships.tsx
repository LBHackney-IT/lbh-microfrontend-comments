import React from "react";

import { useFormikContext } from "formik";

import { Relationship } from "../../types/relationships";
import { CommentsFormData } from "../comment-form/schema";

import { Checkbox, CheckboxGroup, Field, FieldProps } from "@mtfh/common/lib/components";

interface SelectRelationshipsProps extends Omit<FieldProps, "children"> {
  relationships: Relationship[];
}

export const SelectRelationships = ({
  relationships,
  ...props
}: SelectRelationshipsProps) => {
  const { handleChange, values } = useFormikContext<CommentsFormData>();
  if (relationships.length === 1) return null;
  return (
    <Field {...props}>
      <CheckboxGroup>
        {relationships?.map((relationship, index) => (
          <Checkbox
            checked={values.relationshipIds?.includes(relationship.targetId)}
            key={index}
            onChange={handleChange}
            name="relationshipIds"
            id={relationship.targetId}
            value={relationship.targetId}
          >
            {relationship.label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Field>
  );
};
