import { Comment, Person } from '../types';

export const mockComment: Comment = {
    id: 'bbf1e233-7b62-4310-b376-118673d90424',
    description: 'Description of a comment',
    targetType: 'person',
    targetId: 'aac57a95-11e4-9eeb-954a-c2dd5a0a7f31',
    createdAt: '2021-05-12T21:00:57.915Z',
    author: {
        id: '109246088303',
        fullName: null,
        email: 'user@test.com',
    },
};

export const mockPerson: Person = {
    id: '6f22e9ae3e8a4e0eaf46db02eb87f8e6',
    title: 'Mrs',
    preferredFirstname: '',
    preferredSurname: 'Fisher',
    firstName: 'Joan',
    surname: 'Evans',
    middleName: 'M.',
    ethnicity: 'Christian',
    nationality: 'Canadian',
    placeOfBirth: 'Toronto',
    dateOfBirth: '04/03/1988',
    gender: 'F',
    identifications: [
        {
            identificationType: 'NI',
            value: '1234A',
            isOriginalDocumentSeen: true,
            linkToDocument: 'string',
        },
    ],
    languages: [
        {
            language: 'English',
            isPrimary: true,
        },
    ],
    communicationRequirements: ['Sign Language'],
    personTypes: ['Housing Officer', 'Tenants'],
    links: [
        {
            href: 'https://notesapi.hackney.gov.uk/propertynotes/[propertyId]',
            rel: 'notes',
            endpointType: 'GET',
        },
    ],
};

export const mockTenure = {
    id: '9833a771-b89a-dbb7-fe50-91b8fcc873cc',
    paymentReference: '9148415610',
    propertyReference: 'prop-ref',
    tenuredAsset: {
        id: '56b6a112-400c-f3c3-579e-e4bb9c4846cb',
        type: 'Dwelling',
        fullAddress: '27 BOUNDARY HOUSE  Boundary Lane AL7 4EH',
        uprn: '100081148415',
    },
    startOfTenureDate: '2019-07-17T00:00:00',
    endOfTenureDate: null,
    tenureType: {
        code: 'TLA',
        description: 'Temp Annex',
    },
    isActive: true,
};
