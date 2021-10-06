import type { Person } from "@mtfh/common/lib/api/person/v1";
import type { Tenure } from "@mtfh/common/lib/api/tenure/v1";

const locale = {
  personName: (person: Person) => {
    return `${person.firstName} ${person.surname}`;
  },
  tenureName: (tenure: Tenure) => {
    return `Tenure payment ref: ${tenure.paymentReference}`;
  },
  tenureRelationship: (tenure: Tenure) =>
    `Tenure payment ref ${tenure.paymentReference} (${tenure.tenureType.description})`,
  dialog: {
    title: "Are you sure you wish to cancel adding this comment?",
  },
  comments: {
    addCommentToLabel: "Add comment to",
    commentSuccesfullySavedLabel: "Comment successfully saved",
    discardComment: "Discard comment",
    heading: "Add comment",
    saveComment: "Save comment",
    submittingComment: "Submitting...",
    comment: "Comment",
    title: "Comment title",
    category: "Comment category",
    categoryPlaceholder: "Select category",
    highlight: "Highlight this comment",
  },
  errors: {
    errorLabel: "Error",
    pleaseCorrectIndicatedErrorsLabel:
      "Please correct the indicated errors before submitting this form.",
    somethingWentWrongLabel: "Something went wrong. Please try again.",
    unableToFetchRecord: "There was a problem retrieving the record",
    unableToFetchRecordDescription:
      "Please try again. If the issue persists, please contact support.",
  },
  noDataForKey: "N/A",
};

export default locale;
