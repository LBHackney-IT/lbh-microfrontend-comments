import { HTMLProps, ReactElement } from 'react';

export interface FormGroupProperties extends HTMLProps<HTMLDivElement> {
    id: string;
    name: string;
    label: string;
    hint?: string;
    error?: string | false;
    required?: boolean;
    children: ReactElement;
}
