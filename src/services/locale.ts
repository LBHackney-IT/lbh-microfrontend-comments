import { Person } from '../types';

const locale = {
    backLinkLabel: (entityData: Person) => {
        if (!entityData) return 'Back';
        return `${entityData.firstName} ${entityData.surname}`;
    },
    comments: {
        heading: 'Add comment',
        addCommentToLabel: 'Add comment to',
        entityName: (entityData: Person) => {
            return `${locale.backLinkLabel(entityData)}`;
        },
        saveComment: 'Save comment',
        submittingComment: 'Submitting...',
        commentSuccesfullySavedLabel: 'Comment successfully saved',
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
