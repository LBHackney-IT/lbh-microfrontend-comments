import { AxiosSWRResponse, useAxiosSWR } from '@mtfh/common';
import { config } from '../config';
import { Person } from '../../types';

export const usePerson = (id: string): AxiosSWRResponse<Person> => {
    return useAxiosSWR<Person>(`${config.personApiUrl}/persons/${id}`);
};
