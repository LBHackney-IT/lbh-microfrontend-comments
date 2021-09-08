import { AxiosSWRResponse, useAxiosSWR } from '@mtfh/common';
import { Person } from '../../types';
import { config } from '../config';

export const usePerson = (id: string): AxiosSWRResponse<Person> => {
    return useAxiosSWR<Person>(`${config.personApiUrl}/persons/${id}`);
};
