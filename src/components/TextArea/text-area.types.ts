import { HTMLProps } from 'react';

export interface TextAreaProperties extends HTMLProps<HTMLTextAreaElement> {
    maxLength?: number;
    error?: boolean;
}
