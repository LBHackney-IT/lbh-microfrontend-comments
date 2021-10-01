import * as Yup from 'yup';

export const commentsSchema = Yup.object({
    description: Yup.string()
        .required('Please enter a description for the comment')
        .max(500, 'Please reduce the character count to 500 characters'),
    title: Yup.string().required('Please enter a title for the comment'),
    highlight: Yup.boolean(),
    categorisation: Yup.object({
        category: Yup.string().required(),
        subCategory: Yup.string().required(),
        description: Yup.string().required(),
    }),
});

export type CommentsFormData = Yup.Asserts<typeof commentsSchema>;
