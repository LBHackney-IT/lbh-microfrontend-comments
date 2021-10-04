import React from 'react';
import { ChangeEventHandler } from 'react-router/node_modules/@types/react';
import { Checkbox, CheckboxGroup, Field } from '@mtfh/common';
import { Relationship } from '../../types';

export const SelectRelationships = ({
    handleChange,
    relationships,
    values,
}: {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    relationships: Relationship[];
    values: any[] | undefined;
}) => {
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
                        checked={values?.includes(relationship.targetId)}
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
