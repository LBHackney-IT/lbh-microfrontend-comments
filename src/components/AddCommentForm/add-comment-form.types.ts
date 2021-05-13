import { Asserts } from 'yup';
import { FormikProps } from 'formik';
import { Person } from '@services';
import { schema } from './add-comment-form.schema';

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
