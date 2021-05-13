import { HTMLProps } from 'react';

export interface InputProperties extends HTMLProps<HTMLInputElement> {
    error?: boolean;
}
