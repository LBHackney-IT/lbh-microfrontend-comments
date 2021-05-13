import React from 'react';
import classNames from 'classnames';

import './select.styles.scss';
import { SelectProperties } from './select.types';

export function Select({
    error,
    className,
    isFullWidth,
    ...properties
}: SelectProperties): JSX.Element {
    const selectClasses = classNames(
        'govuk-select',
        { 'govuk-!-width-full': isFullWidth },
        'lbh-select',
        { 'govuk-select--error': error },
        className
    );
    return <select className={selectClasses} {...properties} />;
}
