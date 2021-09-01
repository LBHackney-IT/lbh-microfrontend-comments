import * as yup from 'yup';

export const schema = yup.object({
    description: yup
        .string()
        .required('Please enter a description for the comment')
        .max(500, 'Please reduce the character count to 500 characters'),
});
