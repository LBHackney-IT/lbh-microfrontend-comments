import React from 'react';
import { useFormikContext } from 'formik';
import { Checkbox, CheckboxGroup, Field } from '@mtfh/common';
import { CommentsFormData } from '../AddCommentForm';
import { Relationship } from '../../types';

export const SelectRelationships = ({
    relationships,
}: {
    relationships: Relationship[];
}) => {
    const { handleChange, values } = useFormikContext<CommentsFormData>();
    if (relationships.length === 1) return null;
    return (
        <Field
            id="add-comment-relationships"
            name="relationshipIds"
            label="Add comment to"
            required
        >
            <CheckboxGroup>
                {relationships?.map((relationship, index) => (
                    <Checkbox
                        checked={values.relationshipIds?.includes(
                            relationship.targetId
                        )}
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
