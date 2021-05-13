import React from 'react';
import classNames from 'classnames';

import './input.styles.scss';
import { InputProperties } from './input.types';

export function Input({
    error,
    className,
    ...properties
}: InputProperties): JSX.Element {
    const inputClasses = classNames(
        'govuk-input',
        'lbh-input',
        { 'govuk-input--error': error },
        className
    );

    return <input className={inputClasses} {...properties} />;
}
