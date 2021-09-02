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
    },
    errors: {
        unableToFetchRecord: 'There was a problem retrieving the record',
        unableToFetchRecordDescription:
            'Please try again. If the issue persists, please contact support.',
    },
    noDataForKey: 'N/A',
};

export default locale;
