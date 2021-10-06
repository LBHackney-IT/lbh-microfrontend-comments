import * as Yup from "yup";

export type ErrorMessages = {
  errorMessages: Record<string, string>;
};

export const commentsSchema = (errorMessages: Record<string, string>) =>
  Yup.object({
    description: Yup.string()
      .required(errorMessages.W2)
      .max(500, "Please reduce the character count to 500 characters"),
    title: Yup.string().required(errorMessages.W31),
    highlight: Yup.boolean().required(),
    categorisation: Yup.object({
      category: Yup.string().required(errorMessages.W32),
      subCategory: Yup.string().nullable().defined(),
      description: Yup.string().nullable().defined(),
    }),
    relationshipIds: Yup.array()
      .of(Yup.string().required())
      .min(1, errorMessages.W4)
      .required(),
  });

export type CommentsFormData = Yup.Asserts<ReturnType<typeof commentsSchema>>;
