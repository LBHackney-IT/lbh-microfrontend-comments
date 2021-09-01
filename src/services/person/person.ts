import { $auth, AxiosSWRResponse, useAxiosSWR } from '@mtfh/common';
import { GetPersonRequestData, Person } from './person.types';
import { config } from '../config';
import { ResponseException } from '../../utils';

const headers = {
    'Content-Type': 'application/json',
    'x-api-key': config.personApiKey,
    'Authorization': `Bearer ${$auth.getValue().token}`,
};

export const getPersonById = async ({
    id,
    options = {},
}: GetPersonRequestData): Promise<Person> => {
    if (!id) {
        throw new Error('Missing `id` for Person');
    }

    const response = await fetch(`${config.personApiUrl}/persons/${id}`, {
        ...options,
        headers: {
            ...options.headers,
            ...headers,
        },
    });

    const data = await response.json();

    if (response.ok) {
        return data;
    }

    throw new ResponseException(data, response);
};
