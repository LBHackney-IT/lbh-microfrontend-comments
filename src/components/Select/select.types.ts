import { HTMLProps, PropsWithChildren } from 'react';

export interface SelectProperties
    extends PropsWithChildren<HTMLProps<HTMLSelectElement>> {
    error?: boolean;
    isFullWidth?: boolean;
}
