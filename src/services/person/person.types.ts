export interface GetPersonRequestData {
    id: string;
    options?: RequestInit;
}

export type Person = {
    id: string;
    title: string;
    preferredFirstname: string;
    preferredSurname: string;
    firstName: string;
    middleName: string;
    surname: string;
    ethnicity: string;
    nationality: string;
    placeOfBirth: string;
    dateOfBirth: string;
    gender: string;
    identifications: Identification[];
    languages: Language[];
    communicationRequirements: string[];
    personTypes: string[];
    links: Link[];
    [key: string]: any;
};

type Identification = {
    identificationType: string;
    value: string;
    isOriginalDocumentSeen: boolean;
    linkToDocument: string;
};

type Language = {
    language: string;
    isPrimary: boolean;
};

type Link = {
    href: string;
    rel: string;
    endpointType: string;
};
