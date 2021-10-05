import * as Yup from 'yup';

export const commentsSchema = Yup.object({
    description: Yup.string()
        .required('You must enter a description for this comment')
        .max(500, 'Please reduce the character count to 500 characters'),
    title: Yup.string().required('You must enter a title for this comment'),
    highlight: Yup.boolean(),
    categorisation: Yup.object({
        category: Yup.string().required(
            'You must select a category for this comment'
        ),
        subCategory: Yup.string().nullable(),
        description: Yup.string().nullable(),
    }),
    relationshipIds: Yup.array().min(
        1,
        'Select at least one option of your interest'
    ),
});

export type CommentsFormData = Yup.Asserts<typeof commentsSchema>;
