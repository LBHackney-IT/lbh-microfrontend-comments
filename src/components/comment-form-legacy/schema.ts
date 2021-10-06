import * as Yup from "yup";

export const commentsSchemaLegacy = Yup.object({
  description: Yup.string()
    .required("Please enter a description for the comment")
    .max(500, "Please reduce the character count to 500 characters"),
});

export type CommentsFormDataLegacy = Yup.Asserts<typeof commentsSchemaLegacy>;
