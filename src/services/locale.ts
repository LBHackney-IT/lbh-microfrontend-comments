import { Person, Tenure } from '../types';

const locale = {
    personName: (person: Person) => {
        return `${person.firstName} ${person.surname}`;
    },
    tenureName: (tenure: any) => {
        return `Tenure payment ref: ${tenure.paymentReference}`;
    },
    comments: {
        heading: 'Add comment',
        addCommentToLabel: 'Add comment to',
        saveComment: 'Save comment',
        submittingComment: 'Submitting...',
        commentSuccesfullySavedLabel: 'Comment successfully saved',
        selectCategory: 'Select category',
        highlightThisComment: 'Highlight this comment',
    },
    errors: {
        errorLabel: 'Error',
        pleaseCorrectIndicatedErrorsLabel:
            'Please correct the indicated errors before submitting this form.',
        somethingWentWrongLabel: 'Something went wrong. Please try again.',
        unableToFetchRecord: 'There was a problem retrieving the record',
        unableToFetchRecordDescription:
            'Please try again. If the issue persists, please contact support.',
    },
    noDataForKey: 'N/A',
};

export default locale;
