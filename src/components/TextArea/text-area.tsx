import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import { pluralize } from '@utilities';
import './text-area.styles.scss';
import { TextAreaProperties } from './text-area.types';

const getLengthOfValue = (
    initialValue: string | number | readonly string[] | undefined
) => {
    if (typeof initialValue === 'string') {
        return initialValue.length;
    }
    if (Array.isArray(initialValue)) {
        return initialValue.join(',').length;
    }
    return String(initialValue || '').length;
};

export function TextArea({
    maxLength,
    error,
    className,
    onChange,
    ...properties
}: TextAreaProperties): JSX.Element {
    const { value, defaultValue } = properties;
    const isControlled = value !== undefined;
    const initialValue = value || defaultValue;

    const [characterCount, setCharacterCount] = useState(
        getLengthOfValue(initialValue)
    );

    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            if (!isControlled && maxLength !== undefined) {
                setCharacterCount(String(event.currentTarget.value).length);
            }

            if (onChange) {
                onChange(event);
            }
        },
        [onChange, maxLength]
    );

    const exceedingValue = useMemo(
        () =>
            maxLength !== undefined &&
            maxLength -
                (isControlled ? getLengthOfValue(value) : characterCount),
        [maxLength, characterCount, value]
    );

    const textareaClasses = classNames(
        'govuk-textarea',
        { 'govuk-textarea--error': error },
        'lbh-character-count',
        className
    );

    const messageClasses = classNames(
        { 'govuk-hint': exceedingValue !== false && exceedingValue >= 0 },
        'govuk-character-count__message',
        {
            'govuk-error-message':
                exceedingValue !== false && exceedingValue < 0,
        }
    );

    return (
        <>
            <textarea
                className={textareaClasses}
                {...properties}
                onChange={onChangeHandler}
            />
            {maxLength !== undefined && exceedingValue !== false && (
                <span className={messageClasses} aria-live="polite">
                    {exceedingValue >= 0
                        ? `You have ${exceedingValue} ${pluralize(
                              'character',
                              exceedingValue
                          )} remaining`
                        : `You have ${Math.abs(exceedingValue)} ${pluralize(
                              'character',
                              exceedingValue
                          )} too many`}
                </span>
            )}
        </>
    );
}
