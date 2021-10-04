import * as Yup from 'yup';

type ErrorMessages = {
    errorMessages: Record<string, string>;
};

export const commentsSchema = ({ errorMessages }: ErrorMessages) =>
    Yup.object({
        description: Yup.string()
            .required(errorMessages.W2)
            .max(500, 'Please reduce the character count to 500 characters'),
        title: Yup.string().required(errorMessages.W31),
        highlight: Yup.boolean(),
        categorisation: Yup.object({
            category: Yup.string().required(errorMessages.W32),
            subCategory: Yup.string().nullable(),
            description: Yup.string().nullable(),
        }),
        relationshipIds: Yup.array().min(1, errorMessages.W4),
    });

export type CommentsFormData = Yup.Asserts<ReturnType<typeof commentsSchema>>;
