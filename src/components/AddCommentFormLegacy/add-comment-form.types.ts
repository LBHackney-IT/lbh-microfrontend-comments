import { Asserts } from 'yup';
import { FormikProps } from 'formik';
import { schema } from './add-comment-form.schema';
import { Person } from '../../types';

export interface AddCommentUrlParameters {
    id: string;
    type: 'person' | 'tenure' | 'asset' | 'repair';
}

export type AddCommentFormData = Asserts<typeof schema>;
export type AddCommentFormError = 'error' | 'invalid';

export interface AddCommentFormProperties {
    formik: FormikProps<AddCommentFormData>;
    person: Person;
    success: boolean;
    error?: AddCommentFormError;
}

export type FetchState = 'loading' | 'error' | 'invalid' | 'done';
