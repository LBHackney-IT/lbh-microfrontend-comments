import React, { useMemo, Children, cloneElement, isValidElement } from 'react';
import classNames from 'classnames';

import './form-group.styles.scss';
import { FormGroupProperties } from './form-group.types';
import { TextArea } from '../TextArea';

export function FormGroup({
    id,
    name,
    label,
    hint,
    error,
    required,
    children,
    ...properties
}: FormGroupProperties): JSX.Element {
    const formGroupClasses = classNames(
        'govuk-form-group',
        {
            'govuk-form-group--error': !!error,
        },
        'lbh-form-group'
    );

    const describedBy = useMemo(() => {
        const classes: string[] = [];
        if (hint) {
            classes.push(`${id}-hint`);
        }
        if (error) {
            classes.push(`${id}-error`);
        }
        return classes.join(' ');
    }, [id, hint, error]);

    const formGroup = (
        <div className={formGroupClasses} {...properties}>
            <label className="govuk-label lbh-label" htmlFor={id}>
                {label}
                {required ? <sup>*</sup> : ''}
            </label>
            {!!hint && (
                <span id={`${id}-hint`} className="govuk-hint lbh-hint">
                    {hint}
                </span>
            )}
            {!!error && (
                <span
                    id={`${id}-error`}
                    className="govuk-error-message lbh-error-message"
                >
                    <span className="govuk-visually-hidden">Error:</span>{' '}
                    {error}
                </span>
            )}
            {!!children &&
                Children.only(
                    cloneElement(children, {
                        id,
                        name,
                        required,
                        'error': !!error,
                        'aria-describedby': describedBy || undefined,
                    })
                )}
        </div>
    );

    return isValidElement(children) && children.type === TextArea ? (
        <div className="govuk-character-count">{formGroup}</div>
    ) : (
        formGroup
    );
}
