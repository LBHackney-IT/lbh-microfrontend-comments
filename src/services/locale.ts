import { Person } from '../types';

const locale = {
    personName: (person: Person) => {
        return `${person.firstName} ${person.surname}`;
    },
    tenureName: (tenure: any) => {
        return `Tenure payment ref: ${tenure.paymentReference}`;
    },
    dialog: {
        title: 'Are you sure you wish to cancel adding this comment?',
    },
    comments: {
        addCommentToLabel: 'Add comment to',
        commentSuccesfullySavedLabel: 'Comment successfully saved',
        discardComment: 'Discard comment',
        heading: 'Add comment',
        highlightThisComment: 'Highlight this comment',
        saveComment: 'Save comment',
        selectCategory: 'Select category',
        submittingComment: 'Submitting...',
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
